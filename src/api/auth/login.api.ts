import { AUTH_ENDPOINTS } from '@/api/auth/constants'
import { kyRequest } from '@/lib/api'
import {
  LoginRequestBody,
  LoginResponse,
} from '@/packages/shared/types/auth.types'

export const loginApi = async (body: LoginRequestBody) => {
  return await kyRequest<LoginResponse>({
    path: AUTH_ENDPOINTS.LOGIN,
    method: 'POST',
    credentials: 'include',
    json: body,
  })
}
