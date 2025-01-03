import { getMeUsersApiAction } from '@/actions/api/users/users.api.actions';
import { deleteAuthCookies, hasCookie, setCookie } from '@/actions/cookies/cookies.actions';
import { ME_COOKIE, REFRESH_TOKEN_COOKIE } from '@/constants/cookies.constants';
import { ADMIN_ROUTES, PUBLIC_ROUTES, VERIFY_ROUTES } from '@/constants/routes.constants';
import RolesEnum from '@/enums/roles.enum';
import { ObjectMeUsersApiInterface, ResponseGetMeUsersApiInterface } from '@/interfaces/api/users/users.api.interfaces';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextRequest, NextResponse } from 'next/server';

function redirect(url: string, req: NextRequest, res: NextResponse): NextResponse {
	const redirectResponse: NextResponse = NextResponse.redirect(new URL(url, req.nextUrl));
	const cookies: ResponseCookie[] = res.cookies.getAll();
	cookies.map(async (cookie: ResponseCookie): Promise<void> => {
		await setCookie(cookie.name, cookie.value, cookie.maxAge, cookie.path, redirectResponse);
	});

	return redirectResponse;
}

async function verifyAndStoreMeMiddleware(req: NextRequest): Promise<NextResponse> {
	const path: string = req.nextUrl.pathname;
	const refreshToken: boolean = await hasCookie(REFRESH_TOKEN_COOKIE);

	const isRouteMatch: (routes: string[]) => boolean = (routes: string[]): boolean =>
		routes.some((route: string): boolean => route !== '/' && path.startsWith(route));
	const isPublicRoute: boolean = isRouteMatch(PUBLIC_ROUTES);
	const isVerifyRoute: boolean = isRouteMatch(VERIFY_ROUTES);
	const isAdminRoute: boolean = isRouteMatch(ADMIN_ROUTES);

	const nextResponse: NextResponse = NextResponse.next();

	if (!refreshToken) {
		return (isPublicRoute && path !== '/') || (isVerifyRoute && !path.endsWith('/verify-email')) ? NextResponse.next() : redirect('/login', req, nextResponse);
	}

	try {
		const response: ResponseGetMeUsersApiInterface = await getMeUsersApiAction(nextResponse);

		const meData: ObjectMeUsersApiInterface = response.me;

		if (!meData || !meData.id || !meData.email || meData.roles.length < 1 || !meData.firstName || !meData.lastName) {
			await deleteAuthCookies();
			return isPublicRoute || (isVerifyRoute && !path.endsWith('/verify-email')) ? NextResponse.next() : redirect('/login', req, nextResponse);
		}

		if (isVerifyRoute && meData.emailVerifiedAt) {
			return redirect('/dashboard', req, nextResponse);
		}

		if (path === '/') {
			return redirect('/dashboard', req, nextResponse);
		}

		if (isPublicRoute && !req.nextUrl.pathname.startsWith('/dashboard')) {
			return redirect('/dashboard', req, nextResponse);
		}

		if (isAdminRoute && !meData.roles.includes(RolesEnum.ADMIN)) {
			return redirect('/unauthorized', req, nextResponse);
		}

		if (!meData.emailVerifiedAt && !req.nextUrl.pathname.startsWith('/verify-email')) {
			return redirect('/verify-email', req, nextResponse);
		}

		await setCookie(ME_COOKIE, JSON.stringify(meData), 'session', '/', nextResponse);

		return nextResponse;
	} catch {
		await deleteAuthCookies();
		return redirect('/login', req, nextResponse);
	}
}

export default verifyAndStoreMeMiddleware;
