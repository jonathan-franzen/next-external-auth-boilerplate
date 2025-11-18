import { z } from 'zod'

const verifyEmailParams = z.object({
  verifyEmailToken: z.string().nonempty('Verify email token is required.'),
})

export const verifyEmailValidator = z.object({
  params: verifyEmailParams,
})
