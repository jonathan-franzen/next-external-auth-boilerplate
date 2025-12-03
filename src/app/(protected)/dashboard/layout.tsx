'use server'

import { ReactNode } from 'react'

import { Text } from '@/components/text'
import { getSelfFromAuthSession } from '@/lib/auth-session'

interface AdminLayoutProps {
  children: ReactNode
}

const DashboardLayout = async ({ children }: AdminLayoutProps) => {
  const self = await getSelfFromAuthSession()

  return (
    <div>
      <Text as="h3" variant="heading">
        WELCOME, {self.firstName.toUpperCase()}
      </Text>
      {children}
    </div>
  )
}

export default DashboardLayout
