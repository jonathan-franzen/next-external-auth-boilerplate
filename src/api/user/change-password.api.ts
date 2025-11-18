import { authenticatedKyRequest } from '@/api/ky-request'
import { USER_ENDPOINTS } from '@/api/user/constants'
import {
  ChangePasswordRequestBody,
  ChangePasswordResponse,
} from '@/types/user/change-password.types'

export const changePasswordApi = async (body: ChangePasswordRequestBody) => {
  const res = await authenticatedKyRequest<ChangePasswordResponse>({
    path: USER_ENDPOINTS.CHANGE_PASSWORD,
    method: 'POST',
    json: body,
  })

  const awaitedRes = await res.json()

  return {
    setCookies: res.headers.getSetCookie(),
    ...awaitedRes,
  }
}
