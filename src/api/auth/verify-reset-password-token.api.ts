import { AUTH_ENDPOINTS } from '@/api/auth/constants'
import { kyRequest } from '@/lib/api'
import {
  SendResetPasswordEmailResponse,
  VerifyResetPasswordTokenParams,
} from '@/packages/shared/types/auth.types'

export const verifyResetPasswordTokenApi = async (
  params: VerifyResetPasswordTokenParams
) => {
  return await kyRequest<SendResetPasswordEmailResponse>({
    path: AUTH_ENDPOINTS.VERIFY_RESET_PASSWORD_TOKEN(params.resetPasswordToken),
    method: 'GET',
  })
}
