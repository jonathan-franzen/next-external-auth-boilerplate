import { z } from 'zod'

import { order, pagination } from '@/validators/common.validator.js'

const getUsersOrderBy = z.object({
  firstName: order,
  lastName: order,
  email: order,
})

const getUsersRequestFilter = z.object({
  search: z.string().optional(),
})

export const getUsersValidator = z.object({
  body: z.object({
    filter: getUsersRequestFilter,
    orderBy: getUsersOrderBy,
    pagination: pagination,
  }),
})
