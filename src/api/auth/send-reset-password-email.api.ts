import { AUTH_ENDPOINTS } from '@/api/auth/constants'
import { kyRequest } from '@/lib/api'
import {
  SendResetPasswordEmailRequestBody,
  SendResetPasswordEmailResponse,
} from '@/packages/shared/types/auth.types'

export const sendResetPasswordEmailApi = async (
  data: SendResetPasswordEmailRequestBody
) => {
  return await kyRequest<SendResetPasswordEmailResponse>({
    path: AUTH_ENDPOINTS.SEND_RESET_PASSWORD_EMAIL,
    method: 'POST',
    json: data,
  })
}
