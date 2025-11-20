import { authenticatedKyRequest } from '@/api/ky-request'
import { USER_ENDPOINTS } from '@/api/user/constants'
import {
  GetUsersRequestBody,
  GetUsersResponse,
} from '@/types/user/get-users.types'

export const getUsersApi = async (body: GetUsersRequestBody) => {
  const res = await authenticatedKyRequest<GetUsersResponse>({
    path: USER_ENDPOINTS.GET_USERS,
    method: 'POST',
    json: body,
  })

  return await res.json()
}
