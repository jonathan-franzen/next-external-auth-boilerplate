'use client'

import { ReactNode, useEffect } from 'react'

import { keepAuthSession } from '@/features/auth/actions/keep-auth-session'

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  useEffect(() => {
    void keepAuthSession()
  }, [])

  return children
}
