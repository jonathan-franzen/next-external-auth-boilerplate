import { until } from '@open-draft/until'
import { NextRequest, NextResponse } from 'next/server'

import { getSelfApi } from '@/api/user/get-self.api'
import {
  ADMIN_ROUTE_PATHS,
  PUBLIC_ROUTES_PATHS,
  VERIFY_EMAIL_ROUTES_PATHS,
} from '@/constants/routes.constants'
import {
  destroyAuthSession,
  getMiddlewareAuthSession,
} from '@/lib/auth-session'
import { setMiddlewareCookies } from '@/lib/cookies'
import { setCookies } from '@/services/cookies/cookies.service'
import { UserRoles } from '@/types/user/user.types'

const isPathInRoutes = (path: string, routePaths: string[]) =>
  routePaths.some((route) => {
    if (route.endsWith('/**')) {
      const base = route.replace('/**', '')
      return path === base || path.startsWith(base + '/')
    }
    return path === route
  })

const redirect = (url: string, req: NextRequest, setCookieHeader: string[]) => {
  const redirectResponse = NextResponse.redirect(new URL(url, req.nextUrl))

  setMiddlewareCookies(
    setCookieHeader,
    ['session'],
    redirectResponse,
    req.nextUrl
  )

  return redirectResponse
}

export const verifyAndStoreSelfMiddleware = async (req: NextRequest) => {
  const path = req.nextUrl.pathname

  const isPublicRoute = isPathInRoutes(path, PUBLIC_ROUTES_PATHS)
  const isVerifyRoute = isPathInRoutes(path, VERIFY_EMAIL_ROUTES_PATHS)
  const isAdminRoute = isPathInRoutes(path, ADMIN_ROUTE_PATHS)

  const nextResponse = NextResponse.next()

  const authSession = await getMiddlewareAuthSession(req, nextResponse)

  if (!authSession.refreshToken) {
    const setCookieHeader = nextResponse.headers.getSetCookie()

    if (!isPublicRoute) {
      return redirect('/login', req, setCookieHeader)
    }

    return nextResponse
  }

  const [err, res] = await until(() => getSelfApi(authSession))

  if (err) {
    await destroyAuthSession()

    const setCookieHeader = nextResponse.headers.getSetCookie()

    if (!isPublicRoute) {
      return redirect('/login', req, setCookieHeader)
    }

    return nextResponse
  }

  const selfData = res.data

  authSession.self = selfData
  await authSession.save()

  const setCookieHeader = nextResponse.headers.getSetCookie()

  /* Redirects */

  /* If email is verified, redirect away from verify routes */
  if (isVerifyRoute) {
    if (selfData.emailVerifiedAt) {
      return redirect('/dashboard', req, setCookieHeader)
    }

    setMiddlewareCookies(
      setCookieHeader,
      ['session'],
      nextResponse,
      req.nextUrl
    )

    return nextResponse
  }

  /* Redirect to verify email if not verified */
  if (!selfData.emailVerifiedAt) {
    return redirect('/verify-email', req, setCookieHeader)
  }

  /* Redirect public routes to dashboard */
  if (isPublicRoute || path === '/') {
    return redirect('/dashboard', req, setCookieHeader)
  }

  /* Restrict admin routes */
  if (isAdminRoute && !selfData.roles.includes(UserRoles.ADMIN)) {
    return redirect('/unauthorized', req, setCookieHeader)
  }

  setCookies(setCookieHeader, ['session'], nextResponse)

  return nextResponse
}
