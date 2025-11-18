import { z } from 'zod'

import { DataResponse } from '@/types/api/response.types'
import { refreshValidator } from '@/validators/auth/refresh.validator.js'

export type RefreshRequestCookies = z.infer<typeof refreshValidator>['cookies']

export interface RefreshResponseData {
  accessToken: string
}

export interface RefreshResponse extends DataResponse<RefreshResponseData> {}
