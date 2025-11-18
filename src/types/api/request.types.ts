import { Request } from 'express'

import { User } from '@/types/user/user.types.js'

export interface AuthenticatedRequest extends Request {
  user: User
}
