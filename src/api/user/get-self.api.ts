import { authenticatedKyRequest } from '@/api/ky-request'
import { USER_ENDPOINTS } from '@/api/user/constants'
import { GetSelfResponse } from '@/types/user/get-self.types'

export const getSelfApi = async () => {
  const { res, authSession } = await authenticatedKyRequest<GetSelfResponse>({
    path: USER_ENDPOINTS.GET_SELF,
    method: 'GET',
    isServerComponent: true,
  })

  const data = await res.json()

  return { ...data, authSession }
}
