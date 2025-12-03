import { NextRequest, NextResponse } from 'next/server'

import { routeGuard } from '@/proxies/route-guard'

const proxy = async (req: NextRequest) => {
  const isServerAction =
    req.headers.get('next-action') ||
    req.nextUrl.searchParams.has('__serverActionId')

  if (!isServerAction) {
    return await routeGuard(req)
  }

  return NextResponse.next()
}

export default proxy

/* Ignore to call middleware on these routes. */
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|favicon\\.ico).*)'],
}
