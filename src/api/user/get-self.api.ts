import { USER_ENDPOINTS } from '@/api/user/constants'
import { authenticatedKyRequest } from '@/lib/api'
import { GetSelfResponse } from '@/types/user/get-self.types'

export const getSelfApi = async () => {
  const { res, authSession } = await authenticatedKyRequest<GetSelfResponse>({
    path: USER_ENDPOINTS.GET_SELF,
    method: 'GET',
    isServerComponent: true,
  })

  return { res, authSession }
}
