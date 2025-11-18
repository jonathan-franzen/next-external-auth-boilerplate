import { AUTH_ENDPOINTS } from '@/api/auth/constants'
import { kyRequest } from '@/api/ky-request'
import { RefreshResponse } from '@/types/auth/refresh.types'

export const refreshApi = async (refreshToken: string) => {
  const res = await kyRequest<RefreshResponse>({
    path: AUTH_ENDPOINTS.REFRESH,
    method: 'POST',
    credentials: 'include',
    headers: { Cookie: `refreshToken=${refreshToken}` },
  })

  const awaitedRes = await res.json()

  return { setCookies: res.headers.getSetCookie(), ...awaitedRes }
}
