import { AUTH_ENDPOINTS } from '@/api/auth/constants'
import { refreshableKyRequest } from '@/lib/api'
import {
  ResetPasswordRequestBody,
  ResetPasswordResponse,
  ResetPasswordTokenParams,
} from '@/packages/shared/types/auth.types'

export const resetPasswordApi = async (
  params: ResetPasswordTokenParams,
  body: ResetPasswordRequestBody
) => {
  const res = await refreshableKyRequest<ResetPasswordResponse>({
    path: AUTH_ENDPOINTS.RESET_PASSWORD(params.resetPasswordToken),
    method: 'POST',
    json: body,
  })

  return res.json()
}
