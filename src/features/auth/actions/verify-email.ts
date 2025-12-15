'use server'

import { verifyEmailApi } from '@/api/auth/verify-email.api'
import { getAuthSession, updateAuthSession } from '@/lib/auth-session'

export const verifyEmail = async (verifyEmailToken: string) => {
  const res = await verifyEmailApi({ verifyEmailToken })

  const { self } = await getAuthSession()

  if (self) {
    await updateAuthSession({ self: { ...self, emailVerifiedAt: new Date() } })
  }

  return { ...res, self }
}
