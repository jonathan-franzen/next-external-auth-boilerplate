'use client'

import { AuthSessionData } from 'iron-session'
import { useEffect } from 'react'

import { updateAuthSession } from '@/lib/auth-session'

interface SaveAuthSessionProps {
  authSession: AuthSessionData | null
}

export const SaveAuthSession = ({ authSession }: SaveAuthSessionProps) => {
  useEffect(() => {
    if (authSession) {
      void updateAuthSession(authSession)
    }
  }, [authSession])

  return null
}
