import { NextRequest, NextResponse } from 'next/server'

import {
  ADMIN_ROUTE_PATHS,
  PUBLIC_ROUTES_PATHS,
  VERIFY_EMAIL_ROUTES_PATHS,
} from '@/constants/routes.constants'
import { destroyAuthSession, getAuthSession } from '@/lib/auth-session'
import { UserRoles } from '@/types/user.types'

const isPathInRoutes = (path: string, routePaths: string[]) =>
  routePaths.some((route) => {
    if (route.endsWith('/**')) {
      const base = route.replace('/**', '')
      return path === base || path.startsWith(base + '/')
    }
    return path === route
  })

const redirect = (url: string, req: NextRequest) => {
  return NextResponse.redirect(new URL(url, req.nextUrl))
}

export const verifyAndStoreSelfMiddleware = async (req: NextRequest) => {
  const path = req.nextUrl.pathname

  const isPublicRoute = isPathInRoutes(path, PUBLIC_ROUTES_PATHS)
  const isVerifyRoute = isPathInRoutes(path, VERIFY_EMAIL_ROUTES_PATHS)
  const isAdminRoute = isPathInRoutes(path, ADMIN_ROUTE_PATHS)

  const nextResponse = NextResponse.next()

  const authSession = await getAuthSession()

  if (path === '/token-expired') {
    await destroyAuthSession()

    return nextResponse
  }

  if (!authSession.refreshToken) {
    if (!isPublicRoute) {
      return redirect('/login', req)
    }

    return nextResponse
  }

  if (!authSession.self?.id) {
    await destroyAuthSession()

    if (!isPublicRoute) {
      return redirect('/login', req)
    }

    return nextResponse
  }

  /* Redirects */

  console.log(authSession)
  /* If email is verified, redirect away from verify routes */
  if (isVerifyRoute) {
    if (authSession.self.emailVerifiedAt) {
      return redirect('/dashboard', req)
    }

    return nextResponse
  }

  /* Redirect to verify email if not verified */
  if (!authSession.self.emailVerifiedAt) {
    return redirect('/verify-email', req)
  }

  /* Redirect public routes to dashboard */
  if (isPublicRoute || path === '/') {
    return redirect('/dashboard', req)
  }

  /* Restrict admin routes */
  if (isAdminRoute && !authSession.self.roles.includes(UserRoles.ADMIN)) {
    return redirect('/unauthorized', req)
  }

  return nextResponse
}
