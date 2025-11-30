import { z } from 'zod'

import {
  orderValidator,
  paginationValidator,
  passwordValidator,
} from '@/packages/shared/validators/common.validators'

export const updateUserBase = z.object({
  email: z.email().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
})

export const updateSelfBody = updateUserBase.extend({})

export const changePasswordBody = z.object({
  password: z.string().nonempty('Password is required.'),
  newPassword: passwordValidator,
})

export const listUsersOrderBy = z.object({
  firstName: orderValidator,
  lastName: orderValidator,
  email: orderValidator,
})

export const listUsersFilter = z.object({
  search: z.string().optional(),
})

export const updateUserBody = updateUserBase.extend({})

export const userIdParams = z.object({
  userId: z.string(),
})

export const updateSelfValidator = z.object({
  body: updateSelfBody,
})

export const changePasswordValidator = z.object({
  body: changePasswordBody,
})

export const getUserByIdValidator = z.object({
  params: userIdParams,
})

export const listUsersValidator = z.object({
  body: z.object({
    filter: listUsersFilter.optional(),
    orderBy: z.union([z.array(listUsersOrderBy), listUsersOrderBy]).optional(),
    pagination: paginationValidator,
  }),
})

export const updateUserValidator = z.object({
  body: updateUserBody,
  params: userIdParams,
})

export const deleteUserValidator = z.object({
  params: userIdParams,
})
