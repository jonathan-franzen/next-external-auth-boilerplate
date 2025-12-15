import { USER_ENDPOINTS } from '@/api/user/constants'
import { authenticatedKyRequest } from '@/lib/api'
import { GetSelfResponse } from '@/packages/shared/types/user.types'

export const getSelfApi = async () => {
  const res = await authenticatedKyRequest<GetSelfResponse>({
    path: USER_ENDPOINTS.GET_SELF,
    method: 'GET',
  })

  return res.json()
}
