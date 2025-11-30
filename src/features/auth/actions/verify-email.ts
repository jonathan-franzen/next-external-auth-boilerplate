'use server'

import { verifyEmailApi } from '@/api/auth/verify-email.api'
import { parseApiResponse } from '@/lib/api'

export const verifyEmail = async (verifyEmailToken: string) => {
  const res = await verifyEmailApi({ verifyEmailToken })

  return await parseApiResponse(res)
}
