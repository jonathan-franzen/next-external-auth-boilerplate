import verifyAndStoreMeMiddleware from '@/middlewares/verify-and-store-me.middleware';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest): Promise<NextResponse> {
	// Middlewares defined after this won't run on server-actions
	if (!req.headers.has('next-action')) {
		return await verifyAndStoreMeMiddleware(req);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|favicon\\.ico).*)'],
};
