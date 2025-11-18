import { z } from 'zod'

import { getUsersValidator } from '@/validators/user/get-users.validator.js'

export type GetUsersRequestBody = z.infer<typeof getUsersValidator>['body']
