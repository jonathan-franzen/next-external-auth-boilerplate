'use client'

import { useEffect } from 'react'

import { ACCESS_TOKEN_LIFETIME } from '@/constants/auth.constants'
import { refresh } from '@/features/auth/actions/refresh'
import { verifySession } from '@/features/auth/actions/verify-session'

let isVerifying: Promise<unknown> | null = null

export function SessionKeeper() {
  useEffect(() => {
    let isMounted = true

    if (!isVerifying) {
      isVerifying = verifySession().finally(() => {
        isVerifying = null
      })
    }

    const id = setInterval(
      () => {
        if (isMounted) {
          void refresh()
        }
      },
      (ACCESS_TOKEN_LIFETIME * 1000) / 2
    )

    return () => {
      isMounted = false
      clearInterval(id)
    }
  }, [])

  return null
}
