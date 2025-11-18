import { z } from 'zod'

const updateSelfRequestBody = z.object({
  email: z.email().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
})

export const updateSelfValidator = z.object({
  body: updateSelfRequestBody,
})
