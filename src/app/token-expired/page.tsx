'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const TokenExpiredPage = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.replace('/sign-in')
    }, 1000)
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-danger mb-4">SESSION EXPIRED</p>
        <p>Redirecting to sign in...</p>
      </div>
    </div>
  )
}

export default TokenExpiredPage
