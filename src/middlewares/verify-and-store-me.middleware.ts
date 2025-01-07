import { getMeUsersApiAction } from '@/actions/api/users/users.api.actions';
import { AUTH_SESSION_COOKIE_NAME } from '@/constants/cookies.constants';
import { ADMIN_ROUTES, PUBLIC_ROUTES, VERIFY_ROUTES } from '@/constants/routes.constants';
import RolesEnum from '@/enums/roles.enum';
import { ObjectMeUsersApiInterface, ResponseGetMeUsersApiInterface } from '@/interfaces/api/users/users.api.interfaces';
import { setCookies } from '@/services/cookies/cookies.service';
import { destroyAuthSession, getAuthSession } from '@/services/iron-session/iron-session.service';
import { AuthSessionData, IronSession } from 'iron-session';
import { NextRequest, NextResponse } from 'next/server';

// Redirect when certain criteria is met.
async function redirect(url: string, req: NextRequest): Promise<NextResponse> {
	return NextResponse.redirect(new URL(url, req.nextUrl));
}

// Verify access-token & refresh if token has expired.
// Redirect the request or Next();
async function verifyAndStoreMeMiddleware(req: NextRequest): Promise<NextResponse> {
	const path: string = req.nextUrl.pathname;

	const isRouteMatch: (routes: string[]) => boolean = (routes: string[]): boolean =>
		routes.some((route: string): boolean => route !== '/' && path.startsWith(route));
	const isPublicRoute: boolean = isRouteMatch(PUBLIC_ROUTES);
	const isVerifyRoute: boolean = isRouteMatch(VERIFY_ROUTES);
	const isAdminRoute: boolean = isRouteMatch(ADMIN_ROUTES);

	const nextResponse: NextResponse = NextResponse.next();

	const session: IronSession<AuthSessionData> = await getAuthSession(req, nextResponse);

	// If there is no refresh-token stored in authSession,
	// and the request is not against a public route, redirect to login-page.
	if (!session.refreshToken) {
		return (isPublicRoute && path !== '/') || (isVerifyRoute && !path.endsWith('/verify-email')) ? NextResponse.next() : redirect('/login', req);
	}

	try {
		// Get the "me-object" and refresh if token is not valid.
		const response: ResponseGetMeUsersApiInterface = await getMeUsersApiAction(session);
		const meData: ObjectMeUsersApiInterface = response.me;

		// If there is an issue getting me-data,
		// destroy the authSession and redirect to login-page.
		if (!meData || !meData.id || !meData.email || meData.roles.length < 1 || !meData.firstName || !meData.lastName) {
			await destroyAuthSession();
			return isPublicRoute || (isVerifyRoute && !path.endsWith('/verify-email')) ? NextResponse.next() : redirect('/login', req);
		}

		// From here on, the user is authenticated properly

		// Set meData into authSession to be used by server-components.
		session.me = meData;
		await session.save();

		// We need to retrieve the iron-session set-cookie, and then set the cookie on the middlewareResponse as well,
		// to make sure it's available on immediate server-component render
		const setCookieHeader: string[] = nextResponse.headers.getSetCookie();
		await setCookies(setCookieHeader, [AUTH_SESSION_COOKIE_NAME], nextResponse);

		// If trying to view email-verification-page when email is already verified, redirect to dashboard
		if (isVerifyRoute && meData.emailVerifiedAt) {
			return redirect('/dashboard', req);
		}

		// Always redirect root path to dashboard-page
		if (path === '/') {
			return redirect('/dashboard', req);
		}

		// Authenticated users are not allowed to view public routes. Redirect them to dashboard-page.
		if (isPublicRoute && !req.nextUrl.pathname.startsWith('/dashboard')) {
			return redirect('/dashboard', req);
		}

		// if a non-admin user tries to see an admin-route, redirect them to unauthorized page.
		if (isAdminRoute && !meData.roles.includes(RolesEnum.ADMIN)) {
			return redirect('/unauthorized', req);
		}

		// If an unverified user tries to see anything other than the verify-email-page, redirect them there.
		if (!meData.emailVerifiedAt && !req.nextUrl.pathname.startsWith('/verify-email')) {
			return redirect('/verify-email', req);
		}

		return nextResponse;
	} catch {
		// Unexpected errors destroy authSession and redirect to login-page.
		await destroyAuthSession();
		return redirect('/login', req);
	}
}

export default verifyAndStoreMeMiddleware;
