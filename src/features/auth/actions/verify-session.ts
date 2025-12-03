'use server'

import { until } from '@open-draft/until'
import { redirect } from 'next/navigation'

import { verifySessionApi } from '@/api/auth/verify-session.api'
import { parseApiResponse } from '@/lib/api'
import {
  destroyAuthSession,
  getAuthSession,
  updateAuthSession,
} from '@/lib/auth-session'
import { getSetCookieValue } from '@/lib/cookies'
import { isTokenExpiredError } from '@/lib/errors'

export const verifySession = async () => {
  const { accessToken, refreshToken } = await getAuthSession()

  if (accessToken && refreshToken) {
    const res = await verifySessionApi({ accessToken }, refreshToken)

    const [err, awaitedRes] = await until(() => parseApiResponse(res))

    if (err) {
      await destroyAuthSession()

      if (isTokenExpiredError(err)) {
        return redirect('/token-expired')
      }

      throw err
    }

    if (awaitedRes?.data) {
      await updateAuthSession({
        accessToken: awaitedRes.data.accessToken,
        refreshToken: getSetCookieValue(
          res.headers.getSetCookie(),
          'refreshToken'
        ),
      })
    }
  }
}
