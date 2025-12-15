import { until } from '@open-draft/until'
import { ReactNode } from 'react'

import { getSelfApi } from '@/api/user/get-self.api'
import { RscError } from '@/components/rsc-error'
import { SessionKeeper } from '@/features/auth/components/session-keeper'

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = async ({ children }: AuthProviderProps) => {
  const [err, res] = await until(() => getSelfApi())

  if (err) {
    return <RscError err={err} />
  }

  return (
    <>
      <SessionKeeper self={res.data} />
      {children}
    </>
  )
}
