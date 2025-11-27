'use server'

import { USER_ENDPOINTS } from '@/api/user/constants'
import { authenticatedKyRequest } from '@/lib/api'
import { ListUsersRequestBody, ListUsersResponse } from '@/types/user.types'

export const getUsersApi = async (body: ListUsersRequestBody) => {
  const { res, authSession } = await authenticatedKyRequest<ListUsersResponse>({
    path: USER_ENDPOINTS.GET_USERS,
    method: 'POST',
    json: body,
    isServerComponent: true,
  })

  return { res, authSession }
}
