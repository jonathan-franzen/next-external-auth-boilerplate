import { AUTH_ENDPOINTS } from '@/api/auth/constants'
import { kyRequest } from '@/api/ky-request'
import { LoginRequestBody, LoginResponse } from '@/types/auth/login.types'

export const loginApi = async (body: LoginRequestBody) => {
  const res = await kyRequest<LoginResponse>({
    path: AUTH_ENDPOINTS.LOGIN,
    method: 'POST',
    credentials: 'include',
    json: body,
  })

  const awaitedRes = await res.json()

  return { setCookies: res.headers.getSetCookie(), ...awaitedRes }
}
