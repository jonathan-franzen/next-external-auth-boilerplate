'use server'

import { resendVerifyEmailApi } from '@/api/auth/resend-verify-email.api'
import { parseApiResponse } from '@/lib/api'

export const resendVerifyEmail = async (email: string) => {
  const res = await resendVerifyEmailApi({ email })

  return await parseApiResponse(res)
}
