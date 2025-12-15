import { USER_ENDPOINTS } from '@/api/user/constants'
import { refreshableKyRequest } from '@/lib/api'
import {
  ChangePasswordRequestBody,
  ChangePasswordResponse,
} from '@/packages/shared/types/user.types'

export const changePasswordApi = async (body: ChangePasswordRequestBody) => {
  const res = await refreshableKyRequest<ChangePasswordResponse>({
    path: USER_ENDPOINTS.CHANGE_PASSWORD,
    method: 'POST',
    json: body,
  })

  const data = await res.json()

  return { ...data, setCookie: res.headers.getSetCookie() }
}
