import { USER_ENDPOINTS } from '@/api/user/constants'
import { authenticatedKyRequest } from '@/lib/api'
import {
  ChangePasswordRequestBody,
  ChangePasswordResponse,
} from '@/types/user/change-password.types'

export const changePasswordApi = async (body: ChangePasswordRequestBody) => {
  const { res } = await authenticatedKyRequest<ChangePasswordResponse>({
    path: USER_ENDPOINTS.CHANGE_PASSWORD,
    method: 'POST',
    json: body,
    isServerComponent: false,
  })

  return res
}
