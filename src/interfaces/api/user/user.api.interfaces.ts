import { OrderDirection } from '@/types/common.types'

export interface ObjectMeUsersApiInterface {
  email: string
  emailVerifiedAt: null | string
  firstName: string
  id: string
  lastName: string
  roles: string[]
}

export interface ObjectUserUsersApiInterface {
  createdAt: string
  email: string
  emailVerifiedAt: null | string
  firstName: string
  id: string
  lastName: string
  roles: string[]
  updatedAt: string
}

export interface RequestGetUsersApiInterface {
  filters?: Record<string, string>
  limit?: number
  page?: number
  sortBy?: string
  sortOrder?: OrderDirection
}

export interface RequestPatchIdUsersApiInterface {
  email?: string
  firstName?: string
  lastName?: string
}

export interface RequestPostUpdatePasswordMeUsersApiInterface {
  newPassword: string
  password: string
}

export interface ResponseGetMeUsersApiInterface {
  me: ObjectMeUsersApiInterface
  message: string
}

export interface ResponseGetUsersApiInterface {
  message: string
  pagination: {
    limit: number
    page: number
    totalPages: number
  }
  users: ObjectUserUsersApiInterface[]
}

export interface ResponsePatchIdUsersApiInterface {
  message: string
  user: ObjectUserUsersApiInterface
}

export interface ResponsePostUpdatePasswordMeUsersApiInterface {
  accessToken: string
  message: string
}
