import { z } from 'zod'

const updateUserRequestBody = z.object({
  email: z.email().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
})

const updateUserRequestParams = z.object({
  id: z.string().nonempty('User ID is required.'),
})

export const updateUserValidator = z.object({
  body: updateUserRequestBody,
  params: updateUserRequestParams,
})
