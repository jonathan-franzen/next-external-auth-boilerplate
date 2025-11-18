import { z } from 'zod'

import { password } from '@/validators/common.validator'

export const changePasswordRequestBody = z.object({
  password: z.string().nonempty('Password is required.'),
  newPassword: password,
})

export const changePasswordValidator = z.object({
  body: changePasswordRequestBody,
})
