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
  const res = await kyRequest<VerifySessionResponse | undefined>({
    path: AUTH_ENDPOINTS.VERIFY_SESSION,
    method: 'POST',
    credentials: 'include',
    headers: { Cookie: `refreshToken=${refreshToken}` },
    json: body,
  })

  if (res.status === 204) {
    return { data: null, setCookie: null }
  }

  const data = await res.json()

  return { ...data, setCookie: res.headers.getSetCookie() }
}
