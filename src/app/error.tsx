'use client'

const handleReload = () => {
  globalThis.location.reload()
}

const Error = () => {
  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <h1 className="text-center text-sm font-semibold text-gray-700">
          ERROR PAGE
        </h1>
        <div className="mt-2 flex flex-col gap-2 overflow-y-scroll">
          <p className="text-center">Something unexpected happened...</p>
        </div>
      </div>
      <div className="mt-2 flex justify-center">
        <button onClick={handleReload}>Go back</button>
      </div>
    </div>
  )
}

export default Error
