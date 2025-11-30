import { until } from '@open-draft/until'
import { NextRequest, NextResponse } from 'next/server'

import { verifySessionApi } from '@/api/auth/verify-session.api'
import {
  ADMIN_ROUTE_PATHS,
  PUBLIC_ROUTES_PATHS,
  VERIFY_EMAIL_ROUTES_PATHS,
} from '@/constants/routes.constants'
import { parseApiResponse } from '@/lib/api'
import {
  destroyAuthSession,
  getMiddlewareAuthSession,
} from '@/lib/auth-session'
import { getSetCookieValue, setMiddlewareCookies } from '@/lib/cookies'
import { isTokenExpiredError } from '@/lib/errors'
import { UserRoles } from '@/packages/shared/types/user.types'

const isPathInRoutes = (path: string, routePaths: string[]) =>
  routePaths.some((route) => {
    if (route.endsWith('/**')) {
      const base = route.replace('/**', '')
      return path === base || path.startsWith(base + '/')
    }
    return path === route
  })

const redirect = (
  url: string,
  req: NextRequest,
  setCookieHeader?: string[]
) => {
  const redirectResponse = NextResponse.redirect(new URL(url, req.nextUrl))

  if (setCookieHeader) {
    setMiddlewareCookies(setCookieHeader, ['session'], redirectResponse)
  }

  return redirectResponse
}

export const verifySession = async (req: NextRequest) => {
  const path = req.nextUrl.pathname

  const isPublicRoute = isPathInRoutes(path, PUBLIC_ROUTES_PATHS)
  const isVerifyRoute = isPathInRoutes(path, VERIFY_EMAIL_ROUTES_PATHS)
  const isAdminRoute = isPathInRoutes(path, ADMIN_ROUTE_PATHS)

  const nextRes = NextResponse.next()

  const authSession = await getMiddlewareAuthSession(req, nextRes)
  const { accessToken, refreshToken, self } = authSession

  if (path === '/token-expired') {
    await destroyAuthSession()

    const setCookieHeader = nextRes.headers.getSetCookie()
    setMiddlewareCookies(setCookieHeader, ['session'], nextRes)

    return nextRes
  }

  if (!refreshToken || !accessToken) {
    if (!isPublicRoute) {
      return redirect('/token-expired', req)
    }

    return nextRes
  }

  const res = await verifySessionApi({ accessToken }, refreshToken)

  const [err, awaitedRes] = await until(() => parseApiResponse(res))

  if (err) {
    await destroyAuthSession()

    const setCookieHeader = nextRes.headers.getSetCookie()

    if (isTokenExpiredError(err)) {
      return redirect('/token-expired', req, setCookieHeader)
    }

    setMiddlewareCookies(setCookieHeader, ['session'], nextRes)

    throw err
  }

  if (awaitedRes?.data) {
    authSession.accessToken = awaitedRes.data.accessToken
    authSession.refreshToken = getSetCookieValue(
      res.headers.getSetCookie(),
      'refreshToken'
    )

    await authSession.save()
  }

  if (!self?.id) {
    await destroyAuthSession()

    const setCookieHeader = nextRes.headers.getSetCookie()

    if (!isPublicRoute) {
      return redirect('/login', req, setCookieHeader)
    }

    setMiddlewareCookies(setCookieHeader, ['session'], nextRes)

    return nextRes
  }

  const setCookieHeader = nextRes.headers.getSetCookie()
  setMiddlewareCookies(setCookieHeader, ['session'], nextRes)

  /* Redirects */

  /* If email is verified, redirect away from verify routes */
  if (isVerifyRoute) {
    if (self.emailVerifiedAt) {
      return redirect('/dashboard', req, setCookieHeader)
    }

    return nextRes
  }

  /* Redirect to verify email if not verified */
  if (!self.emailVerifiedAt) {
    return redirect('/verify-email', req, setCookieHeader)
  }

  /* Redirect public routes to dashboard */
  if (isPublicRoute || path === '/') {
    return redirect('/dashboard', req, setCookieHeader)
  }

  /* Restrict admin routes */
  if (isAdminRoute && !self.roles.includes(UserRoles.ADMIN)) {
    return redirect('/unauthorized', req, setCookieHeader)
  }

  return nextRes
}
