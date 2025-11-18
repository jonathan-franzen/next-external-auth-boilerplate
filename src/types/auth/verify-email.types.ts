import { z } from 'zod'

import { verifyEmailValidator } from '@/validators/auth/verify-email.validator.js'

export type VerifyEmailRequestParams = z.infer<
  typeof verifyEmailValidator
>['params']
