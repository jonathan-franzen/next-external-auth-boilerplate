'use server'

import { until } from '@open-draft/until'
import { redirect } from 'next/navigation'

import { verifySessionApi } from '@/api/auth/verify-session.api'
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
    const [err, res] = await until(() =>
      verifySessionApi({ accessToken }, refreshToken)
    )

    if (err) {
      await destroyAuthSession()

      if (isTokenExpiredError(err)) {
        return redirect('/token-expired')
      }

      throw err
    }

    if (res.data?.accessToken) {
      await updateAuthSession({
        accessToken: res.data.accessToken,
        refreshToken: getSetCookieValue(res.setCookie, 'refreshToken'),
      })
    }
  }
}
