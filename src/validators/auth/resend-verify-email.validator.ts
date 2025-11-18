import { z } from 'zod'

const resendVerifyEmailBody = z.object({
  email: z.email(),
})

export const resendVerifyEmailValidator = z.object({
  body: resendVerifyEmailBody,
})
