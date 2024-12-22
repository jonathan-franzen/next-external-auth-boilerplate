import cookieService from '@/services/cookie';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextRequest, NextResponse } from 'next/server';

function middlewareRedirect(url: string, req: NextRequest, res: NextResponse): NextResponse {
	const redirectResponse: NextResponse = NextResponse.redirect(new URL(url, req.nextUrl));
	const cookies: ResponseCookie[] = res.cookies.getAll();
	cookies.map(async (cookie: ResponseCookie): Promise<void> => {
		await cookieService.setCookie(cookie.name, cookie.value, cookie.maxAge, cookie.path, redirectResponse);
	});

	return redirectResponse;
}

export default middlewareRedirect;
