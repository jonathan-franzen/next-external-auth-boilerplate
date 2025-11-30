'use server'

import { getSelfApi } from '@/api/user/get-self.api'
import { parseApiResponse } from '@/lib/api'
import { getAuthSession, updateAuthSession } from '@/lib/auth-session'

export const keepAuthSession = async () => {
  const { accessToken, refreshToken } = await getAuthSession()

  if (accessToken && refreshToken) {
    const res = await getSelfApi()

    const { data } = await parseApiResponse(res)

    await updateAuthSession({ self: data })
  }
}
