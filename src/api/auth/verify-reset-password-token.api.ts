import { AUTH_ENDPOINTS } from '@/api/auth/constants'
import { KyRequest } from '@/lib/api'
import {
  SendResetPasswordEmailResponse,
  VerifyResetPasswordTokenParams,
} from '@/packages/shared/types/auth.types'

export const verifyResetPasswordTokenApi = async (
  params: VerifyResetPasswordTokenParams
) => {
  return await KyRequest<SendResetPasswordEmailResponse>({
    path: AUTH_ENDPOINTS.VERIFY_RESET_PASSWORD_TOKEN(params.resetPasswordToken),
    method: 'GET',
  })
}
