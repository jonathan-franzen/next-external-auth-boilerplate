import { IronSession, IronSessionData } from 'iron-session'

import { authenticatedKyRequest } from '@/api/ky-request'
import { USER_ENDPOINTS } from '@/api/user/constants'
import { GetSelfResponse } from '@/types/user/get-self.types'

export const getSelfApi = async (session?: IronSession<IronSessionData>) => {
  const res = await authenticatedKyRequest<GetSelfResponse>({
    path: USER_ENDPOINTS.GET_SELF,
    method: 'GET',
    session,
  })

  return await res.json()
}
