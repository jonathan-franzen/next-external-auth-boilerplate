import { until } from '@open-draft/until'
import { ReactNode } from 'react'

import { getSelfApi } from '@/api/user/get-self.api'
import { RscError } from '@/components/rsc-error'
import { SessionKeeper } from '@/features/auth/components/session-keeper'
import { parseApiResponse } from '@/lib/api'

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = async ({ children }: AuthProviderProps) => {
  const res = await getSelfApi()

  const [err] = await until(() => parseApiResponse(res))

  if (err) {
    return <RscError err={err} />
  }

  return (
    <>
      <SessionKeeper />
      {children}
    </>
  )
}
