import { z } from 'zod'

import { registerValidator } from '@/validators/auth/register.validator.js'

export type RegisterRequestBody = z.infer<typeof registerValidator>['body']
