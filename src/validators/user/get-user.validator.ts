import { z } from 'zod'

const getUserRequestParams = z.object({
  id: z.string().nonempty('User ID is required.'),
})

export const getUserValidator = z.object({
  params: getUserRequestParams,
})
