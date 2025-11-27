import { AUTH_ENDPOINTS } from '@/api/auth/constants'
import { KyRequest } from '@/lib/api'
import { LoginRequestBody, LoginResponse } from '@/types/auth.types'

export const loginApi = async (body: LoginRequestBody) => {
  return await KyRequest<LoginResponse>({
    path: AUTH_ENDPOINTS.LOGIN,
    method: 'POST',
    credentials: 'include',
    json: body,
  })
}
