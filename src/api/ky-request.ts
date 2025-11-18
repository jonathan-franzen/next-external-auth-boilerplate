import { until } from '@open-draft/until'
import { IronSession, IronSessionData } from 'iron-session'
import { Input, Options } from 'ky'

import { refreshApi } from '@/api/auth/refresh.api'
import { api } from '@/config/ky.config'
import { getAuthSession, updateAuthSession } from '@/lib/auth-session'
import { getSetCookieValue } from '@/lib/cookies'

interface KyRequestOptions extends Options {
  path: Input
}

interface AuthenticatedKyRequestOptions extends KyRequestOptions {
  session?: IronSession<IronSessionData>
}

const withAuthHeader = (accessToken?: string, options?: Options): Options => {
  if (!accessToken) return { ...options }

  return {
    ...options,
    headers: {
      ...(options?.headers ?? {}),
      Authorization: `Bearer ${accessToken}`,
    },
  }
}

export const kyRequest = async <T>({ path, ...options }: KyRequestOptions) => {
  return api<T>(path, options)
}

export const authenticatedKyRequest = async <T>({
  path,
  session,
  ...options
}: AuthenticatedKyRequestOptions) => {
  const { accessToken, refreshToken } = session ?? (await getAuthSession())

  const firstCallOptions = {
    ...withAuthHeader(accessToken, options),
    throwHttpErrors: false,
  }

  const firstRes = await kyRequest<T>({ path, ...firstCallOptions })

  if (!refreshToken || firstRes.ok || firstRes.status !== 401) {
    return firstRes
  }

  const [refreshErr, refreshRes] = await until(() => refreshApi(refreshToken))

  if (refreshErr) {
    return firstRes
  }

  const newAccessToken = refreshRes.data.accessToken

  const newRefreshToken = getSetCookieValue(
    refreshRes.setCookies,
    'refreshToken'
  )

  if (session) {
    session.accessToken = newAccessToken
    session.refreshToken = newRefreshToken
  } else {
    await updateAuthSession({
      refreshToken: newRefreshToken,
      accessToken: newAccessToken,
    })
  }

  const retryOptions = {
    ...withAuthHeader(newAccessToken, options),
  }

  return kyRequest<T>({ path, ...retryOptions })
}
