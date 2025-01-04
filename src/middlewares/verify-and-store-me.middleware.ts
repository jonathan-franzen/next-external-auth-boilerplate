import { getMeUsersApiAction } from '@/actions/api/users/users.api.actions';
import { deleteAuthCookies, hasCookie, setCookie } from '@/actions/cookies/cookies.actions';
import { ME_COOKIE, REFRESH_TOKEN_COOKIE } from '@/constants/cookies.constants';
import { ADMIN_ROUTES, PUBLIC_ROUTES, VERIFY_ROUTES } from '@/constants/routes.constants';
import RolesEnum from '@/enums/roles.enum';
import { ObjectMeUsersApiInterface, ResponseGetMeUsersApiInterface } from '@/interfaces/api/users/users.api.interfaces';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextRequest, NextResponse } from 'next/server';

// Redirect when certain criteria is met.
// Add cookies that are set on the response object also n the redirect object.
function redirect(url: string, req: NextRequest, res: NextResponse): NextResponse {
	const redirectResponse: NextResponse = NextResponse.redirect(new URL(url, req.nextUrl));
	const cookies: ResponseCookie[] = res.cookies.getAll();
	cookies.map(async (cookie: ResponseCookie): Promise<void> => {
		await setCookie(cookie.name, cookie.value, cookie.maxAge, cookie.path, redirectResponse);
	});

	return redirectResponse;
}

// Verify access-token & refresh if token has expired.
// Redirect the request when certain criteria is met.
async function verifyAndStoreMeMiddleware(req: NextRequest): Promise<NextResponse> {
	const path: string = req.nextUrl.pathname;
	const refreshToken: boolean = await hasCookie(REFRESH_TOKEN_COOKIE);

	const isRouteMatch: (routes: string[]) => boolean = (routes: string[]): boolean =>
		routes.some((route: string): boolean => route !== '/' && path.startsWith(route));
	const isPublicRoute: boolean = isRouteMatch(PUBLIC_ROUTES);
	const isVerifyRoute: boolean = isRouteMatch(VERIFY_ROUTES);
	const isAdminRoute: boolean = isRouteMatch(ADMIN_ROUTES);

	const nextResponse: NextResponse = NextResponse.next();

	// If there is no refresh-token stored in cookies,
	// and the request is not against a public route, redirect to login-page.
	if (!refreshToken) {
		return (isPublicRoute && path !== '/') || (isVerifyRoute && !path.endsWith('/verify-email')) ? NextResponse.next() : redirect('/login', req, nextResponse);
	}

	try {
		// Get the "me-object" and refresh if token is not valid.
		const response: ResponseGetMeUsersApiInterface = await getMeUsersApiAction(nextResponse);
		const meData: ObjectMeUsersApiInterface = response.me;

		// If there is an issue getting me-data,
		// delete all authentication-related cookies and redirect to login-page.
		if (!meData || !meData.id || !meData.email || meData.roles.length < 1 || !meData.firstName || !meData.lastName) {
			await deleteAuthCookies();
			return isPublicRoute || (isVerifyRoute && !path.endsWith('/verify-email')) ? NextResponse.next() : redirect('/login', req, nextResponse);
		}

		// From here on, the user is authenticated properly

		// If trying to view email-verification-page when email is already verified, redirect to dashboard
		if (isVerifyRoute && meData.emailVerifiedAt) {
			return redirect('/dashboard', req, nextResponse);
		}

		// Always redirect root path to dashboard-page
		if (path === '/') {
			return redirect('/dashboard', req, nextResponse);
		}

		// Authenticated users are not allowed to view public routes. Redirect them to dashboard-page.
		if (isPublicRoute && !req.nextUrl.pathname.startsWith('/dashboard')) {
			return redirect('/dashboard', req, nextResponse);
		}

		// if a non-admin user tries to see an admin-route, redirect them to unauthorized page.
		if (isAdminRoute && !meData.roles.includes(RolesEnum.ADMIN)) {
			return redirect('/unauthorized', req, nextResponse);
		}

		// If an unverified user tries to see anything other than the verify-email-page, redirect them there.
		if (!meData.emailVerifiedAt && !req.nextUrl.pathname.startsWith('/verify-email')) {
			return redirect('/verify-email', req, nextResponse);
		}

		// Set meData into cookie to be used by server-components.
		await setCookie(ME_COOKIE, JSON.stringify(meData), 'session', '/', nextResponse);

		return nextResponse;
	} catch {
		// Unexpected errors delete all authentication-cookies and redirect to login-page.
		await deleteAuthCookies();
		return redirect('/login', req, nextResponse);
	}
}

export default verifyAndStoreMeMiddleware;
