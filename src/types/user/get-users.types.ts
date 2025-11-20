import { z } from 'zod'

import { PaginationResponse } from '@/types/api/response.types'
import { User } from '@/types/user/user.types'
import { getUsersValidator } from '@/validators/user/get-users.validator.js'

export type GetUsersRequestBody = z.infer<typeof getUsersValidator>['body']

export interface GetUsersResponse extends PaginationResponse<User> {}
