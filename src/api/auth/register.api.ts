import { AUTH_ENDPOINTS } from '@/api/auth/constants'
import { KyRequest } from '@/lib/api'
import { RegisterRequestBody, RegisterResponse } from '@/types/auth.types'

export const registerApi = async (body: RegisterRequestBody) => {
  return await KyRequest<RegisterResponse>({
    path: AUTH_ENDPOINTS.REGISTER,
    method: 'POST',
    json: body,
  })
}
