import { NextRequest } from 'next/server'

import { verifyAndStoreSelfMiddleware } from '@/middlewares/verify-and-store-self.middleware'

const middleware = async (req: NextRequest) => {
  return await verifyAndStoreSelfMiddleware(req)
}

export default middleware

/* Ignore to call middleware on these routes. */
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|favicon\\.ico).*)'],
}
