'use server'

import { resendVerifyEmailApi } from '@/api/auth/resend-verify-email.api'

export const resendVerifyEmail = async (email: string) => {
  const res = await resendVerifyEmailApi({ email })

  return res.json()
}
