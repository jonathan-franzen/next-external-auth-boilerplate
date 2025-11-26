'use server'

import { until } from '@open-draft/until'
import createHttpError, { isHttpError } from 'http-errors'
import { Input, KyResponse, Options } from 'ky'
import { redirect } from 'next/navigation'

import { refreshApi } from '@/api/auth/refresh.api'
import { api } from '@/config/ky.config'
import { getAuthSession, updateAuthSession } from '@/lib/auth-session'
import { getSetCookieValue } from '@/lib/cookies'
import { ErrorResponse } from '@/types/api/response.types'

interface KyRequestOptions extends Options {
  path: Input
}

interface AuthenticatedKyRequestOptions extends KyRequestOptions {
  isServerComponent?: boolean
}

const withAuthHeader = (accessToken?: string, options?: Options): Options => {
  if (!accessToken) {
    return { ...options }
  }

  return {
    ...options,
    headers: {
      ...(options?.headers ?? {}),
      Authorization: `Bearer ${accessToken}`,
    },
  }
}

export const KyRequest = async <T>({ path, ...options }: KyRequestOptions) => {
  return api<T>(path, options)
}

export const authenticatedKyRequest = async <T>({
  path,
  isServerComponent = false,
  ...options
}: AuthenticatedKyRequestOptions) => {
  const { accessToken, refreshToken } = await getAuthSession()

  const firstCallOptions = {
    ...withAuthHeader(accessToken, options),
  }

  const firstRes = await KyRequest<T>({ path, ...firstCallOptions })

  if (firstRes.ok) {
    return { res: firstRes, authSession: null }
  }

  if (!refreshToken || firstRes.status !== 401) {
    return { res: firstRes, authSession: null }
  }

  const refreshRes = await refreshApi(refreshToken)

  const [refreshErr, awaitedRefreshRes] = await until(() =>
    parseApiResponse(refreshRes)
  )

  if (refreshErr) {
    if (isHttpError(refreshErr) && refreshErr.status === 401) {
      return redirect('/token-expired')
    }
    throw refreshErr
  }

  const newAccessToken = awaitedRefreshRes.data.accessToken

  const newRefreshToken = getSetCookieValue(
    refreshRes.headers.getSetCookie(),
    'refreshToken'
  )

  if (!isServerComponent) {
    await updateAuthSession({
      refreshToken: newRefreshToken,
      accessToken: newAccessToken,
    })
  }

  const retryOptions = {
    ...withAuthHeader(newAccessToken, options),
  }

  return {
    res: await KyRequest<T>({ path, ...retryOptions }),
    authSession: {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    },
  }
}

export const parseApiResponse = async <T>(res: KyResponse<T>): Promise<T> => {
  if (!res.ok) {
    const [err, data] = await until(() => res.json<ErrorResponse>())

    if (err) {
      throw createHttpError(res.status, 'Something went wrong.')
    }

    throw createHttpError(res.status, data.message)
  }

  if (res.status === 204) {
    return null as T
  }

  return await res.json()
}
