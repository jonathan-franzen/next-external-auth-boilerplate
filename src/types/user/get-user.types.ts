import { z } from 'zod'

import { getUserValidator } from '@/validators/user/get-user.validator.js'

export type GetUserRequestParams = z.infer<typeof getUserValidator>['params']
