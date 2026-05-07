import { useState } from 'react'

interface CopyLinkButtonProps {
  roomId: string
}

export function CopyLinkButton({ roomId }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const link = `${window.location.origin}${window.location.pathname}#/join/${roomId}`
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard not available
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Room: {roomId}</span>
      <button
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
        onClick={handleCopy}
      >
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  )
}
