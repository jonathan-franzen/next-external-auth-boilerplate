'use client'

import { useEffect } from 'react'

import { ACCESS_TOKEN_LIFETIME } from '@/constants/auth.constants'
import { verifySession } from '@/features/auth/actions/verify-session'

export function SessionKeeper() {
  useEffect(() => {
    let isMounted = true

    void verifySession()

    const id = setInterval(
      () => {
        if (isMounted) {
          void verifySession()
        }
      },
      (ACCESS_TOKEN_LIFETIME * 1000) / 3
    )

    return () => {
      isMounted = false
      clearInterval(id)
    }
  }, [])

  return null
}
