import { z } from 'zod'

import { password } from '@/validators/common.validator.js'

const resetPasswordRequestBody = z.object({
  newPassword: password,
})

const resetPasswordRequestParams = z.object({
  resetPasswordToken: z.string().nonempty('Reset password token is required.'),
})

export const resetPasswordValidator = z.object({
  body: resetPasswordRequestBody,
  params: resetPasswordRequestParams,
})
