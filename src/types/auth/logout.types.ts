import { z } from 'zod'

import { logoutValidator } from '@/validators/auth/logout.validator.js'

export type LogoutRequestCookies = z.infer<typeof logoutValidator>['cookies']
