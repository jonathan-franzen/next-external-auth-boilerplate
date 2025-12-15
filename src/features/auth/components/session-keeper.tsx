'use client'

import { useEffect, useRef } from 'react'

import { ACCESS_TOKEN_LIFETIME } from '@/config/app.config'
import { verifySession } from '@/features/auth/actions/verify-session'
import { updateAuthSession } from '@/lib/auth-session'
import { User } from '@/packages/shared/types/user.types'

let verifyPromise: Promise<void> | null = null

export function SessionKeeper({ self }: { self: User }) {
  const mountedRef = useRef(true)

  useEffect(() => {
    async function verify() {
      await updateAuthSession({ self })

      if (verifyPromise) {
        await verifyPromise
        return
      }

      verifyPromise = (async () => {
        try {
          await verifySession()
        } finally {
          verifyPromise = null
        }
      })()

      await verifyPromise
    }

    void verify()

    const id = setInterval(
      () => {
        if (mountedRef.current) {
          void verify()
        }
      },
      (ACCESS_TOKEN_LIFETIME * 1000) / 3
    )

    return () => {
      mountedRef.current = false
      clearInterval(id)
    }
  }, [])

  return null
}
