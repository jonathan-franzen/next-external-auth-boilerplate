import { getMeUsersApiAction } from '@/actions/api/users/users.api.actions';
import { ADMIN_ROUTES, PUBLIC_ROUTES, VERIFY_ROUTES } from '@/constants/routes.constants';
import RolesEnum from '@/enums/roles.enum';
import { ObjectMeUsersApiInterface, ResponseGetMeUsersApiInterface } from '@/interfaces/api/users/users.api.interfaces';
import { destroyAuthSession, getAuthSession } from '@/utils/iron-session';
import { AuthSessionData, IronSession } from 'iron-session';
import { NextRequest, NextResponse } from 'next/server';

// Redirect when certain criteria is met.
// Add cookies that are set on the response object also n the redirect object.
async function redirect(url: string, req: NextRequest, session?: IronSession<AuthSessionData>): Promise<NextResponse> {
	const redirectResponse: NextResponse = NextResponse.redirect(new URL(url, req.nextUrl));

	if (session) {
		await session.save('x-middleware-set-cookie');
	}

	return redirectResponse;
}

// Verify access-token & refresh if token has expired.
// Redirect the request when certain criteria is met.
async function verifyAndStoreMeMiddleware(req: NextRequest): Promise<NextResponse> {
	const path: string = req.nextUrl.pathname;

	const isRouteMatch: (routes: string[]) => boolean = (routes: string[]): boolean =>
		routes.some((route: string): boolean => route !== '/' && path.startsWith(route));
	const isPublicRoute: boolean = isRouteMatch(PUBLIC_ROUTES);
	const isVerifyRoute: boolean = isRouteMatch(VERIFY_ROUTES);
	const isAdminRoute: boolean = isRouteMatch(ADMIN_ROUTES);

	const nextResponse: NextResponse = NextResponse.next();

	const session: IronSession<AuthSessionData> = await getAuthSession(req, nextResponse);

	// If there is no refresh-token stored in cookies,
	// and the request is not against a public route, redirect to login-page.
	if (!session.refreshToken) {
		return (isPublicRoute && path !== '/') || (isVerifyRoute && !path.endsWith('/verify-email')) ? NextResponse.next() : redirect('/login', req, session);
	}

	try {
		// Get the "me-object" and refresh if token is not valid.
		const response: ResponseGetMeUsersApiInterface = await getMeUsersApiAction(session);
		const meData: ObjectMeUsersApiInterface = response.me;

		// If there is an issue getting me-data,
		// delete all authentication-related cookies and redirect to login-page.
		if (!meData || !meData.id || !meData.email || meData.roles.length < 1 || !meData.firstName || !meData.lastName) {
			await destroyAuthSession();
			return isPublicRoute || (isVerifyRoute && !path.endsWith('/verify-email')) ? NextResponse.next() : redirect('/login', req);
		}

		// From here on, the user is authenticated properly

		// Set meData into iron-session to be used by server-components.
		session.me = meData;
		await session.save('x-middleware-set-cookie');

		// If trying to view email-verification-page when email is already verified, redirect to dashboard
		if (isVerifyRoute && meData.emailVerifiedAt) {
			return redirect('/dashboard', req, session);
		}

		// Always redirect root path to dashboard-page
		if (path === '/') {
			return redirect('/dashboard', req, session);
		}

		// Authenticated users are not allowed to view public routes. Redirect them to dashboard-page.
		if (isPublicRoute && !req.nextUrl.pathname.startsWith('/dashboard')) {
			return redirect('/dashboard', req, session);
		}

		// if a non-admin user tries to see an admin-route, redirect them to unauthorized page.
		if (isAdminRoute && !meData.roles.includes(RolesEnum.ADMIN)) {
			return redirect('/unauthorized', req, session);
		}

		// If an unverified user tries to see anything other than the verify-email-page, redirect them there.
		if (!meData.emailVerifiedAt && !req.nextUrl.pathname.startsWith('/verify-email')) {
			return redirect('/verify-email', req, session);
		}

		return nextResponse;
	} catch {
		// Unexpected errors delete all authentication-cookies and redirect to login-page.
		await destroyAuthSession();
		return redirect('/login', req);
	}
}

export default verifyAndStoreMeMiddleware;
