import { AUTH_ENDPOINTS } from '@/api/auth/constants'
import { kyRequest } from '@/lib/api'
import { RefreshResponse } from '@/packages/shared/types/auth.types'

export const refreshApi = async (refreshToken: string) => {
  return await kyRequest<RefreshResponse>({
    path: AUTH_ENDPOINTS.REFRESH,
    method: 'POST',
    credentials: 'include',
    headers: { Cookie: `refreshToken=${refreshToken}` },
  })
}
