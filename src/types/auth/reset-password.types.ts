import { z } from 'zod'

import { resetPasswordValidator } from '@/validators/auth/reset-password.validator.js'

export type ResetPasswordRequestBody = z.infer<
  typeof resetPasswordValidator
>['body']

export type ResetPasswordRequestParams = z.infer<
  typeof resetPasswordValidator
>['params']
