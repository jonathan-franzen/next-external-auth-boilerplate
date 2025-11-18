import { z } from 'zod'

import { DataResponse } from '@/types/api/response.types'
import { changePasswordValidator } from '@/validators/user/change-password.validator.js'

export type ChangePasswordRequestBody = z.infer<
  typeof changePasswordValidator
>['body']

export interface ChangePasswordResponseData {
  accessToken: string
}

export interface ChangePasswordResponse
  extends DataResponse<ChangePasswordResponseData> {}
