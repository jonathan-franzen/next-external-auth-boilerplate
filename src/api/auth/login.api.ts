import { AUTH_ENDPOINTS } from '@/api/auth/constants'
import { kyRequest } from '@/lib/api'
import {
  LoginRequestBody,
  LoginResponse,
} from '@/packages/shared/types/auth.types'

export const loginApi = async (body: LoginRequestBody) => {
  const res = await kyRequest<LoginResponse>({
    path: AUTH_ENDPOINTS.LOGIN,
    method: 'POST',
    credentials: 'include',
    json: body,
  })

  const data = await res.json()

  return { ...data, setCookie: res.headers.getSetCookie() }
}
