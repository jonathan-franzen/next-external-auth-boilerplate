'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { destroyAuthSession } from '@/lib/auth-session'

const TokenExpiredPage = () => {
  const router = useRouter()

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    ;(async () => {
      await destroyAuthSession()

      timeout = setTimeout(() => {
        router.replace('/login')
      }, 1000)
    })()

    return () => clearTimeout(timeout)
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
