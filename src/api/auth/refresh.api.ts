import { AUTH_ENDPOINTS } from '@/api/auth/constants'
import { kyRequest } from '@/lib/api'
import { RefreshResponse } from '@/packages/shared/types/auth.types'

export const refreshApi = async (refreshToken: string) => {
  const res = await kyRequest<RefreshResponse>({
    path: AUTH_ENDPOINTS.REFRESH,
    method: 'POST',
    credentials: 'include',
    headers: { Cookie: `refreshToken=${refreshToken}` },
  })

  const data = await res.json()

  return { ...data, setCookie: res.headers.getSetCookie() }
}
