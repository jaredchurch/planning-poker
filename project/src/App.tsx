import { useState, useEffect, useCallback, useRef } from 'react'
import { storeRoomId, clearAllSession, getStoredRoomId } from './utils/storage'
import Peer from 'peerjs'
import type { DataConnection } from 'peerjs'
import { LandingPage } from './components/LandingPage'
import { HostDashboard } from './components/HostDashboard'
import { PeerDashboard } from './components/PeerDashboard'
import { HomeScreen } from './components/HomeScreen'
import { ConnectionLost } from './components/ConnectionLost'
import { JiraConfigPanel } from './components/JiraConfigPanel'
import { JiraFetchForm } from './components/JiraFetchForm'
import { useBeforeUnload } from './hooks/useBeforeUnload'
import { useRoom } from './hooks/useRoom'
import { usePresence } from './hooks/usePresence'
import { createPeer, connectToPeer } from './services/peerConnectionService'
import { addParticipant, removeParticipant, broadcastPresenceUpdate } from './services/roomService'
import { sendMessage, parseMessage } from './services/messageProtocol'
import { parseRoomIdFromHash } from './utils/deepLink'
import type { RoomParticipant } from './types/room'
import type { VoteScaleId, Item, VotingRound } from './types/voting'
import type { ExportedItem } from './types/export'
import type { JiraConfig, JiraIssue } from './types/jira'
import { startNewRound, castVote, getCurrentRound, setRevealed, allVoted, clearRound, removeVote, setConsensus } from './services/votingService'
import { calculateConsensus } from './services/consensusService'
import { getScale } from './utils/scales'

type View = 'landing' | 'host-dashboard' | 'peer-dashboard' | 'home' | 'connection-lost'

const SCALE_ID: VoteScaleId = 'fibonacci'

function App() {
  const [view, setView] = useState<View>('landing')
  const [peer, setPeer] = useState<Peer | null>(null)
  const [peerId, setPeerId] = useState<string | null>(null)
  const [connections, setConnections] = useState<DataConnection[]>([])
  const [hostPeerId, setHostPeerId] = useState<string | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<string>('')
  const { room, initRoom, setStatus } = useRoom()
  const { participants, updateParticipants } = usePresence()

  const [currentRound, setCurrentRound] = useState<VotingRound | null>(null)
  const [selectedValue, setSelectedValue] = useState<number | string | null>(null)
  const [items, setItems] = useState<Item[]>([
    { id: 'item-1', key: 'PROJ-1', summary: 'Initial item', isActive: true },
  ])
  const [activeItemId, setActiveItemId] = useState<string>('item-1')
  const [revealedVotes, setRevealedVotes] = useState<{ participantId: string; participantName: string; value: number | string }[]>([])
  const [jiraConfig, setJiraConfig] = useState<JiraConfig | null>(null)

  useBeforeUnload(view === 'host-dashboard')

  const connectionsRef = useRef<DataConnection[]>(connections)
  connectionsRef.current = connections

  const participantsRef = useRef<RoomParticipant[]>(participants)
  participantsRef.current = participants

  useEffect(() => {
    const roomId = parseRoomIdFromHash()
    if (roomId) {
      setView('landing')
    }
  }, [])

  const handleRoomCreated = useCallback((peerInstance: Peer, id: string, name: string) => {
    const newRoom = initRoom(id, name)
    storeRoomId(newRoom.roomId)
    updateParticipants(newRoom.participants)
    setPeer(peerInstance)
    setPeerId(id)
    const round = startNewRound(activeItemId, SCALE_ID)
    setCurrentRound(round)
    setView('host-dashboard')
  }, [initRoom, updateParticipants, activeItemId])

  const handlePeerConnected = useCallback((conn: DataConnection) => {
    conn.on('data', (raw: unknown) => {
      const msg = parseMessage(raw as string)
      if (!msg) return

      if (msg.type === 'join') {
        const participant = participantsRef.current.find((p) => p.id === conn.peer)
        if (!participant) {
          const newParticipant = addParticipant(room!, conn.peer, msg.name)
          const round = getCurrentRound()
          sendMessage(conn, {
            type: 'joined',
            roomId: room!.roomId,
            participants: room!.participants,
          })
          if (round) {
            const scale = getScale(round.scaleId)
            sendMessage(conn, { type: 'focus-item', itemId: round.itemId })
          }
          broadcastPresenceUpdate(connectionsRef.current, room!.participants)
          updateParticipants([...room!.participants])
        }
      }

      if (msg.type === 'vote') {
        castVote(conn.peer, msg.value)
        broadcastPresenceUpdate(connectionsRef.current, room!.participants)
        const round = getCurrentRound()
        if (round) {
          setCurrentRound({ ...round })
          if (round.autoReveal && allVoted(participantsRef.current.length)) {
            handleReveal()
          }
        }
      }

      if (msg.type === 'leave' || msg.type === 'exit') {
        removeVote(conn.peer)
        removeParticipant(room!, conn.peer)
        broadcastPresenceUpdate(connectionsRef.current, room!.participants)
        updateParticipants([...room!.participants])
      }

      if (msg.type === 'presence-update') {
        updateParticipants(msg.participants)
      }

      if (msg.type === 'pong') {
        // heartbeat received
      }

      if (msg.type === 'session-closed') {
        setView('home')
      }
    })

    conn.on('close', () => {
      removeVote(conn.peer)
      removeParticipant(room!, conn.peer)
      broadcastPresenceUpdate(connectionsRef.current, room!.participants)
      updateParticipants([...room!.participants])
    })

    setConnections((prev) => [...prev, conn])
  }, [room, updateParticipants])

  const handleCreateRoom = useCallback(async (name: string) => {
    const newPeer = createPeer()
    newPeer.on('open', (id) => {
      handleRoomCreated(newPeer, id, name)
    })
    newPeer.on('connection', (conn) => {
      handlePeerConnected(conn)
    })
  }, [handleRoomCreated, handlePeerConnected])

  const handleJoinRoom = useCallback(async (roomId: string, name: string) => {
    setConnectionStatus('Connecting...')
    const newPeer = createPeer()
    newPeer.on('open', async () => {
      try {
        const conn = await connectToPeer(newPeer, roomId)
        setPeer(newPeer)
        setPeerId(conn.peer)
        setHostPeerId(roomId)

        sendMessage(conn, { type: 'join', name })

        conn.on('data', (raw: unknown) => {
          const msg = parseMessage(raw as string)
          if (!msg) return

          if (msg.type === 'joined') {
            updateParticipants(msg.participants)
            setConnectionStatus('')
            const round = getCurrentRound() || startNewRound(activeItemId, SCALE_ID)
            setCurrentRound(round)
            setView('peer-dashboard')
          }

          if (msg.type === 'presence-update') {
            updateParticipants(msg.participants)
          }

          if (msg.type === 'session-closed') {
            setView('home')
          }

          if (msg.type === 'ping') {
            sendMessage(conn, { type: 'pong' })
          }

          if (msg.type === 'vote-update') {
            setSelectedValue(msg.voteStatus === 'voted' ? selectedValue : null)
          }

          if (msg.type === 'reveal') {
            const round = getCurrentRound()
            if (round) {
              setRevealed(true)
              setRevealedVotes(msg.votes.map((v) => ({
                participantId: v.participantId,
                participantName: participantsRef.current.find((p) => p.id === v.participantId)?.name || '',
                value: v.value,
              })))
              setConsensus(msg.consensus)
              setCurrentRound({ ...round, isRevealed: true, consensus: msg.consensus })
            }
          }

          if (msg.type === 'focus-item') {
            setActiveItemId(msg.itemId)
            setSelectedValue(null)
            setRevealedVotes([])
            const round = startNewRound(msg.itemId, SCALE_ID)
            setCurrentRound(round)
          }

          if (msg.type === 're-vote') {
            setSelectedValue(null)
            setRevealedVotes([])
            const round = getCurrentRound()
            if (round) {
              clearRound()
              setCurrentRound({ ...round, isRevealed: false, votes: [], consensus: null })
            }
          }

          if (msg.type === 'next-item') {
            setSelectedValue(null)
            setRevealedVotes([])
            const round = getCurrentRound()
            if (round) {
              clearRound()
              setCurrentRound({ ...round, isRevealed: false, votes: [], consensus: null })
            }
          }
        })

        conn.on('close', () => {
          setView('connection-lost')
        })
      } catch {
        setConnectionStatus('Room Not Found')
      }
    })
  }, [updateParticipants, selectedValue, activeItemId])

  const handlePeerVote = useCallback((value: number | string) => {
    setSelectedValue(value)
    if (hostPeerId) {
      const conn = connectionsRef.current.find((c) => c.peer === hostPeerId)
      if (conn?.open) sendMessage(conn, { type: 'vote', value })
    }
  }, [hostPeerId])

  const handleReveal = useCallback(() => {
    const round = getCurrentRound()
    if (!round) return
    setRevealed(true)
    const result = calculateConsensus(round.votes, round.scaleId)
    const votesWithNames = round.votes.map((v) => ({
      participantId: v.participantId,
      participantName: participantsRef.current.find((p) => p.id === v.participantId)?.name || '',
      value: v.value,
    }))
    setRevealedVotes(votesWithNames)
    setConsensus(result.consensus)
    setCurrentRound({ ...round, isRevealed: true, consensus: result.consensus })
    connectionsRef.current.forEach((conn) => {
      if (conn.open) {
        sendMessage(conn, {
          type: 'reveal',
          votes: round.votes.map((v) => ({ participantId: v.participantId, value: v.value })),
          consensus: result.consensus,
        })
      }
    })
  }, [])

  const handleFocusItem = useCallback((itemId: string) => {
    setActiveItemId(itemId)
    setSelectedValue(null)
    setRevealedVotes([])
    const round = startNewRound(itemId, SCALE_ID)
    setCurrentRound(round)
    connectionsRef.current.forEach((conn) => {
      if (conn.open) sendMessage(conn, { type: 'focus-item', itemId })
    })
  }, [])

  const handleNextItem = useCallback(() => {
    const currentIdx = items.findIndex((i) => i.id === activeItemId)
    const nextIdx = (currentIdx + 1) % items.length
    handleFocusItem(items[nextIdx].id)
  }, [items, activeItemId, handleFocusItem])

  const handleRevote = useCallback(() => {
    clearRound()
    setSelectedValue(null)
    setRevealedVotes([])
    const round = getCurrentRound()
    if (round) setCurrentRound({ ...round, isRevealed: false, votes: [], consensus: null })
    connectionsRef.current.forEach((conn) => {
      if (conn.open) sendMessage(conn, { type: 're-vote' })
    })
  }, [])

  const handlePeerExit = useCallback(() => {
    if (peer) {
      if (hostPeerId) {
        const conn = connectionsRef.current.find((c) => c.peer === hostPeerId)
        if (conn?.open) sendMessage(conn, { type: 'leave' })
      }
      peer.destroy()
    }
    setView('home')
  }, [peer, hostPeerId])

  const handleHostClose = useCallback(() => {
    setStatus('closed')
    connections.forEach((conn) => {
      if (conn.open) {
        sendMessage(conn, { type: 'session-closed' })
        conn.close()
      }
    })
    if (peer) {
      peer.destroy()
    }
    clearAllSession()
    setView('home')
  }, [connections, peer, setStatus])

  const roomIdFromUrl = parseRoomIdFromHash()
  const storedRoomId = getStoredRoomId()

  const handleRecoverSession = useCallback(async () => {
    clearAllSession()
    setView('landing')
  }, [])

  if (view === 'home') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <HomeScreen />
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => { setView('landing'); window.location.hash = '#/' }}
        >
          Back to Home
        </button>
      </div>
    )
  }

  if (view === 'connection-lost') {
    return <ConnectionLost />
  }

  const exportItems: ExportedItem[] = items.map((item) => {
    const round = currentRound
    const votes: Record<string, number | string> = {}
    if (round) {
      round.votes.forEach((v) => {
        const p = participants.find((p) => p.id === v.participantId)
        votes[p?.name || v.participantId] = v.value
      })
    }
    return {
      issueKey: item.key,
      summary: item.summary,
      individualVotes: votes,
      finalConsensus: round?.consensus || null,
    }
  })

  const handleConsensusChange = useCallback((value: number | string | null) => {
    const round = getCurrentRound()
    if (round) {
      setConsensus(value)
      setCurrentRound({ ...round, consensus: value })
    }
  }, [])

  const handleAddIssues = useCallback((jiraIssues: JiraIssue[]) => {
    const newItems: Item[] = jiraIssues.map((ji, i) => ({
      id: `jira-${ji.key}-${i}`,
      key: ji.key,
      summary: ji.summary,
      isActive: false,
    }))
    setItems((prev) => [...prev, ...newItems])
  }, [])

  if (view === 'host-dashboard' && room) {
    const round = currentRound
    const allHaveVoted = round ? allVoted(participants.length - 1) : false
    return (
      <div className="max-w-lg mx-auto">
        <HostDashboard
          onCloseSession={handleHostClose}
          roomId={room.roomId}
          participants={participants}
          scaleId={SCALE_ID}
          isRevealed={round?.isRevealed || false}
          revealedVotes={revealedVotes}
          consensus={round?.consensus || null}
          items={items}
          activeItemId={activeItemId}
          allVoted={allHaveVoted}
          onReveal={handleReveal}
          onFocusItem={handleFocusItem}
          onNextItem={handleNextItem}
          onRevote={handleRevote}
          exportItems={exportItems}
          onConsensusChange={handleConsensusChange}
        />
        <div className="mt-6 space-y-4">
          <details className="border rounded-lg">
            <summary className="p-3 cursor-pointer font-semibold text-sm bg-gray-50 hover:bg-gray-100">
              Jira Integration
            </summary>
            <div className="p-4 space-y-4">
              <JiraConfigPanel onConfigChange={setJiraConfig} />
              {jiraConfig && (
                <JiraFetchForm config={jiraConfig} onAddToSession={handleAddIssues} />
              )}
            </div>
          </details>
        </div>
      </div>
    )
  }

  if (view === 'peer-dashboard') {
    const round = currentRound
    const activeItem = items.find((i) => i.id === activeItemId)
    return (
      <PeerDashboard
        onExit={handlePeerExit}
        scaleId={SCALE_ID}
        selectedValue={selectedValue}
        isRevealed={round?.isRevealed || false}
        revealedVotes={revealedVotes}
        consensus={round?.consensus || null}
        activeItemKey={activeItem?.key}
        activeItemSummary={activeItem?.summary}
        onVote={handlePeerVote}
      />
    )
  }

  return (
    <div>
      {storedRoomId && (
        <div className="bg-yellow-50 border-b border-yellow-200 p-3 text-center text-sm">
          Previous session found (Room: {storedRoomId}).
          <button className="ml-2 underline text-blue-600" onClick={handleRecoverSession}>
            Dismiss
          </button>
        </div>
      )}
      <LandingPage
        onCreateRoom={handleCreateRoom}
        onJoinRoom={handleJoinRoom}
        roomIdFromUrl={roomIdFromUrl ?? undefined}
      />
    </div>
  )
}

export default App
