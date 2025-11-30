import { AUTH_ENDPOINTS } from '@/api/auth/constants'
import { KyRequest } from '@/lib/api'
import {
  ResendVerifyEmailRequestBody,
  ResendVerifyEmailResponse,
} from '@/packages/shared/types/auth.types'

export const resendVerifyEmailApi = async (
  data: ResendVerifyEmailRequestBody
) => {
  return await KyRequest<ResendVerifyEmailResponse>({
    path: AUTH_ENDPOINTS.RESEND_VERIFY_EMAIL,
    method: 'POST',
    json: data,
  })
}
