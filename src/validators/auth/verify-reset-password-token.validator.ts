import { z } from 'zod'

const verifyResetPasswordTokenParams = z.object({
  resetPasswordToken: z.string().nonempty('Reset password token is required.'),
})

export const verifyResetPasswordTokenValidator = z.object({
  params: verifyResetPasswordTokenParams,
})
