'use server'

import Link from 'next/link'

const RootNotFound = () => {
  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <h1 className="text-center text-sm font-semibold text-gray-700">
          NOT FOUND
        </h1>
        <div className="mt-2 flex flex-col gap-2 overflow-y-scroll">
          <p className="text-center">This page is not found...</p>
        </div>
      </div>

      <div className="mt-2 flex justify-center">
        <Link href="/">Back to home</Link>
      </div>
    </div>
  )
}

export default RootNotFound
