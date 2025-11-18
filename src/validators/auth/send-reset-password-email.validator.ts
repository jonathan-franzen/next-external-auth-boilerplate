import { z } from 'zod'

const sendResetPasswordEmailBody = z.object({
  email: z.email(),
})

export const sendResetPasswordEmailValidator = z.object({
  body: sendResetPasswordEmailBody,
})
