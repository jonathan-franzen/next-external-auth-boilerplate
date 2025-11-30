import { AUTH_ENDPOINTS } from '@/api/auth/constants'
import { KyRequest } from '@/lib/api'
import {
  VerifySessionRequestBody,
  VerifySessionResponse,
} from '@/packages/shared/types/auth.types'

export const verifySessionApi = async (
  body: VerifySessionRequestBody,
  refreshToken: string
) => {
  return await KyRequest<VerifySessionResponse | undefined>({
    path: AUTH_ENDPOINTS.VERIFY_SESSION,
    method: 'POST',
    credentials: 'include',
    headers: { Cookie: `refreshToken=${refreshToken}` },
    json: body,
  })
}
