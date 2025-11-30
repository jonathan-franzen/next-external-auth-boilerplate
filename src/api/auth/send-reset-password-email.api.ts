import { AUTH_ENDPOINTS } from '@/api/auth/constants'
import { KyRequest } from '@/lib/api'
import {
  SendResetPasswordEmailRequestBody,
  SendResetPasswordEmailResponse,
} from '@/packages/shared/types/auth.types'

export const sendResetPasswordEmailApi = async (
  data: SendResetPasswordEmailRequestBody
) => {
  return await KyRequest<SendResetPasswordEmailResponse>({
    path: AUTH_ENDPOINTS.SEND_RESET_PASSWORD_EMAIL,
    method: 'POST',
    json: data,
  })
}
