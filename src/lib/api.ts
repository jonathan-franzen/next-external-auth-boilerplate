'use server'

import { until } from '@open-draft/until'
import createHttpError from 'http-errors'
import { Input, KyResponse, Options } from 'ky'
import { redirect } from 'next/navigation'

import { refreshApi } from '@/api/auth/refresh.api'
import { api } from '@/config/ky.config'
import { getAuthSession, updateAuthSession } from '@/lib/auth-session'
import { getSetCookieValue } from '@/lib/cookies'
import { isTokenExpiredError } from '@/lib/errors'
import { ErrorResponse } from '@/packages/shared/types/api.types'

interface KyRequestOptions extends Options {
  path: Input
}

interface AuthenticatedKyRequestOptions extends KyRequestOptions {
  accessToken?: string
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

export const kyRequest = async <T>({ path, ...options }: KyRequestOptions) => {
  return api<T>(path, options)
}

export const authenticatedKyRequest = async <T>({
  path,
  accessToken,
  ...options
}: AuthenticatedKyRequestOptions) => {
  const finalAccessToken = accessToken ?? (await getAuthSession()).accessToken

  const authenticatedOptions = {
    ...withAuthHeader(finalAccessToken, options),
  }

  return await kyRequest<T>({ path, ...authenticatedOptions })
}

export const refreshableKyRequest = async <T>({
  path,
  ...options
}: KyRequestOptions) => {
  const { accessToken, refreshToken } = await getAuthSession()

  const firstCallOptions = {
    ...withAuthHeader(accessToken, options),
  }

  const firstRes = await kyRequest<T>({ path, ...firstCallOptions })

  if (!refreshToken || firstRes.status !== 401) {
    return firstRes
  }

  const refreshRes = await refreshApi(refreshToken)

  const [refreshErr, awaitedRefreshRes] = await until(() =>
    parseApiResponse(refreshRes)
  )

  if (refreshErr) {
    if (isTokenExpiredError(refreshErr)) {
      return redirect('/token-expired')
    }

    throw refreshErr
  }

  const newAccessToken = awaitedRefreshRes.data.accessToken

  const newRefreshToken = getSetCookieValue(
    refreshRes.headers.getSetCookie(),
    'refreshToken'
  )

  await updateAuthSession({
    refreshToken: newRefreshToken,
    accessToken: newAccessToken,
  })

  const retryOptions = {
    ...withAuthHeader(newAccessToken, options),
  }

  return await kyRequest<T>({ path, ...retryOptions })
}

export const parseApiResponse = async <T>(res: KyResponse<T>): Promise<T> => {
  if (!res.ok) {
    const [err, data] = await until(() => res.json<ErrorResponse>())

    if (err) {
      throw createHttpError(res.status, err.message)
    }

    throw createHttpError(res.status, data.message)
  }

  if (res.status === 204) {
    return null as T
  }

  return await res.json()
}
