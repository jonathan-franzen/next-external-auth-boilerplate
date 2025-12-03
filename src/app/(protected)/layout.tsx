'use server'

import { ReactNode } from 'react'

import { AuthProvider } from '@/features/auth/providers/auth-provider'

interface AdminLayoutProps {
  children: ReactNode
}

const ProtectedLayout = ({ children }: AdminLayoutProps) => {
  return <AuthProvider>{children}</AuthProvider>
}

export default ProtectedLayout
