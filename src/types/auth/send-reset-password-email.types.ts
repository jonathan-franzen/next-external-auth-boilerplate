import { z } from 'zod'

import { sendResetPasswordEmailValidator } from '@/validators/auth/send-reset-password-email.validator.js'

export type SendResetPasswordEmailRequestBody = z.infer<
  typeof sendResetPasswordEmailValidator
>['body']
