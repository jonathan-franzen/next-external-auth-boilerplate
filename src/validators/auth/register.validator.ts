import { z } from 'zod'

import { password } from '@/validators/common.validator.js'

const registerRequestBody = z.object({
  email: z.email(),
  password: password,
  firstName: z.string().nonempty('First name is required.'),
  lastName: z.string().nonempty('Last name is required.'),
})

export const registerValidator = z.object({
  body: registerRequestBody,
})
