import { z } from 'zod'

import { resendVerifyEmailValidator } from '@/validators/auth/resend-verify-email.validator.js'

export type ResendVerifyEmailRequestBody = z.infer<
  typeof resendVerifyEmailValidator
>['body']
