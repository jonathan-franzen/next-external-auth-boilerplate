import { z } from 'zod'

import { DataResponse } from '@/types/api/response.types'
import { loginValidator } from '@/validators/auth/login.validator.js'

export type LoginRequestBody = z.infer<typeof loginValidator>['body']
export type LoginRequestCookies = z.infer<typeof loginValidator>['cookies']

export interface LoginResponseData {
  accessToken: string
}

export interface LoginResponse extends DataResponse<LoginResponseData> {}
