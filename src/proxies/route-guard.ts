import { NextRequest, NextResponse } from 'next/server'

import {
  ADMIN_ROUTE_PATHS,
  PUBLIC_ROUTES_PATHS,
  VERIFY_EMAIL_ROUTES_PATHS,
} from '@/config/app.config'
import {
  destroyAuthSession,
  getMiddlewareAuthSession,
} from '@/lib/auth-session'
import { UserRoles } from '@/packages/shared/types/user.types'

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

export const routeGuard = async (req: NextRequest) => {
  const path = req.nextUrl.pathname

  const isPublicRoute = isPathInRoutes(path, PUBLIC_ROUTES_PATHS)
  const isVerifyRoute = isPathInRoutes(path, VERIFY_EMAIL_ROUTES_PATHS)
  const isAdminRoute = isPathInRoutes(path, ADMIN_ROUTE_PATHS)

  const nextRes = NextResponse.next()

  const { self } = await getMiddlewareAuthSession(req, nextRes)

  if (path === '/token-expired') {
    await destroyAuthSession()

    return nextRes
  }

  if (!self?.id) {
    await destroyAuthSession()

    if (!isPublicRoute) {
      return redirect('/login', req)
    }

    return nextRes
  }

  /* Redirects */

  /* If email is verified, redirect away from verify routes */
  if (isVerifyRoute) {
    if (self.emailVerifiedAt) {
      return redirect('/dashboard', req)
    }

    return nextRes
  }

  /* Redirect to verify email if not verified */
  if (!self.emailVerifiedAt) {
    return redirect('/verify-email', req)
  }

  /* Redirect public routes to dashboard */
  if (isPublicRoute || path === '/') {
    return redirect('/dashboard', req)
  }

  /* Restrict admin routes */
  if (isAdminRoute && !self.roles.includes(UserRoles.ADMIN)) {
    return redirect('/unauthorized', req)
  }

  return nextRes
}
