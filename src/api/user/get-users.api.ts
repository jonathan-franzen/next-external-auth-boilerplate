'use server'

import { USER_ENDPOINTS } from '@/api/user/constants'
import { authenticatedKyRequest } from '@/lib/api'
import {
  GetUsersRequestBody,
  GetUsersResponse,
} from '@/types/user/get-users.types'

export const getUsersApi = async (body: GetUsersRequestBody) => {
  const { res, authSession } = await authenticatedKyRequest<GetUsersResponse>({
    path: USER_ENDPOINTS.GET_USERS,
    method: 'POST',
    json: body,
    isServerComponent: true,
  })

  return { res, authSession }
}
