import { AUTH_ENDPOINTS } from '@/api/auth/constants'
import { kyRequest } from '@/lib/api'
import {
  ResendVerifyEmailResponse,
  VerifyEmailTokenParams,
} from '@/packages/shared/types/auth.types'

export const verifyEmailApi = async (params: VerifyEmailTokenParams) => {
  return await kyRequest<ResendVerifyEmailResponse>({
    path: AUTH_ENDPOINTS.VERIFY_EMAIL(params.verifyEmailToken),
    method: 'POST',
  })
}
