import { z } from 'zod'

import { verifyResetPasswordTokenValidator } from '@/validators/auth/verify-reset-password-token.validator.js'

export type VerifyResetPasswordTokenRequestParams = z.infer<
  typeof verifyResetPasswordTokenValidator
>['params']
