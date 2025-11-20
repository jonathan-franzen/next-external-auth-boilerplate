import { z } from 'zod'

import { order, pagination } from '@/validators/common.validator'

export const getUsersOrderBy = z.object({
  firstName: order,
  lastName: order,
  email: order,
  createdAt: order,
})

const getUsersRequestFilter = z.object({
  search: z.string().optional(),
})

export const getUsersValidator = z.object({
  body: z.object({
    filter: getUsersRequestFilter,
    orderBy: z.union([z.array(getUsersOrderBy), getUsersOrderBy]).optional(),
    pagination: pagination,
  }),
})
