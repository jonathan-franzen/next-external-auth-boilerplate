'use server'

import { until } from '@open-draft/until'
import createHttpError, { isHttpError } from 'http-errors'
import { Input, Options } from 'ky'
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

export const kyRequest = async <T>({ path, ...options }: KyRequestOptions) => {
  const res = await api<T>(path, options)

  if (!res.ok) {
    const [err, data] = await until(() => res.json<ErrorResponse>())

    if (err) {
      throw createHttpError(res.status, 'Something went wrong.')
    }

    throw createHttpError(res.status, data.message)
  }

  return res
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

  const [firstErr, firstRes] = await until(() =>
    kyRequest<T>({ path, ...firstCallOptions })
  )

  if (!firstErr) {
    return { res: firstRes, authSession: null }
  }

  const isUnauthorizedError = isHttpError(firstErr) && firstErr.status === 401

  if (!refreshToken || !isUnauthorizedError) {
    throw firstErr
  }

  const [refreshErr, refreshRes] = await until(() => refreshApi(refreshToken))

  if (refreshErr) {
    if (isHttpError(refreshErr) && refreshErr.status === 401) {
      return redirect('/token-expired')
    }
    throw refreshErr
  }

  const newAccessToken = refreshRes.data.accessToken

  const newRefreshToken = getSetCookieValue(
    refreshRes.setCookies,
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
    res: await kyRequest<T>({ path, ...retryOptions }),
    authSession: {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    },
  }
}
