import { z } from 'zod'

import { updateUserValidator } from '@/validators/user/update-user.validator.js'

export type UpdateUserRequestBody = z.infer<typeof updateUserValidator>['body']
export type UpdateUserRequestParams = z.infer<
  typeof updateUserValidator
>['params']
