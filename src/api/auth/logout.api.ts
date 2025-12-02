import { AUTH_ENDPOINTS } from '@/api/auth/constants'
import { kyRequest } from '@/lib/api'
import { getAuthSession } from '@/lib/auth-session'

export const logoutApi = async () => {
  const { refreshToken } = await getAuthSession()

  return await kyRequest<null>({
    path: AUTH_ENDPOINTS.LOGOUT,
    method: 'DELETE',
    credentials: 'include',
    headers: { Cookie: `refreshToken=${refreshToken}` },
  })
}
