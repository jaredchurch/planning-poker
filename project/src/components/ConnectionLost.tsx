export function ConnectionLost() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold text-yellow-800 mb-2">Connection Lost</h2>
        <p className="text-yellow-700">The connection to the Host has been lost.</p>
      </div>
    </div>
  )
}
