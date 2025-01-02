import verifyAndStoreMeMiddleware from '@/middlewares/verify-and-store-me.middleware';
import { NextRequest, NextResponse } from 'next/server';

async function middleware(req: NextRequest): Promise<NextResponse> {
	return await verifyAndStoreMeMiddleware(req);
}

export default middleware;

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|favicon\\.ico).*)'],
};
