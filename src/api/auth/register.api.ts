import { AUTH_ENDPOINTS } from '@/api/auth/constants'
import { kyRequest } from '@/lib/api'
import {
  RegisterRequestBody,
  RegisterResponse,
} from '@/packages/shared/types/auth.types'

export const registerApi = async (body: RegisterRequestBody) => {
  return await kyRequest<RegisterResponse>({
    path: AUTH_ENDPOINTS.REGISTER,
    method: 'POST',
    json: body,
  })
}
