import { AUTH_ENDPOINTS } from '@/api/auth/constants'
import { kyRequest } from '@/api/ky-request'
import { getAuthSession } from '@/lib/auth-session'

export const logoutApi = async () => {
  const { refreshToken } = await getAuthSession()

  await kyRequest<null>({
    path: AUTH_ENDPOINTS.LOGOUT,
    method: 'DELETE',
    credentials: 'include',
    headers: { Cookie: `refreshToken=${refreshToken}` },
  })
}
