import { z } from 'zod'

import { DataResponse, PaginationResponse } from '@/types/api.types'
import {
  changePasswordValidator,
  listUsersValidator,
  updateSelfValidator,
  updateUserValidator,
  userIdParams,
} from '@/validators/user.validators'

// User
export enum UserRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  roles: UserRoles[]
  emailVerifiedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

//Params
export type UserIdParams = z.infer<typeof userIdParams>

// Body
export type UpdateSelfRequestBody = z.infer<typeof updateSelfValidator>['body']

export type ChangePasswordRequestBody = z.infer<
  typeof changePasswordValidator
>['body']

export type ListUsersRequestBody = z.infer<typeof listUsersValidator>['body']

export type UpdateUserRequestBody = z.infer<typeof updateUserValidator>['body']

// Response data
export interface ChangePasswordResponseData {
  accessToken: string
}

// Response
export interface GetSelfResponse extends DataResponse<User> {}

export interface UpdateSelfResponse extends DataResponse<User> {}

export interface ChangePasswordResponse
  extends DataResponse<ChangePasswordResponseData> {}

export interface GetUserByIdResponse extends DataResponse<User> {}

export interface ListUsersResponse extends PaginationResponse<User> {}

export interface UpdateUserResponse extends DataResponse<User> {}
