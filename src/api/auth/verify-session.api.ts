import { AUTH_ENDPOINTS } from '@/api/auth/constants'
import { kyRequest } from '@/lib/api'
import {
  VerifySessionRequestBody,
  VerifySessionResponse,
} from '@/packages/shared/types/auth.types'

export const verifySessionApi = async (
  body: VerifySessionRequestBody,
  refreshToken: string
) => {
  return await kyRequest<VerifySessionResponse | undefined>({
    path: AUTH_ENDPOINTS.VERIFY_SESSION,
    method: 'POST',
    credentials: 'include',
    headers: { Cookie: `refreshToken=${refreshToken}` },
    json: body,
  })
}
