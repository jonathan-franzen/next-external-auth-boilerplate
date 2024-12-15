import { ADMIN_ROUTES, PUBLIC_ROUTES, VERIFY_ROUTES } from '@/constants/routes.constants';
import { RolesEnum } from '@/enums/roles.enum';
import { MeObjectResponseUsersApiInterface } from '@/interfaces/api/users/response/me.response.users.api.interface';
import cookieService from '@/services/cookie';
import validationService from '@/services/validation';
import nextRequestRedirect from '@/utils/next-request-redirect';
import { NextRequest, NextResponse } from 'next/server';

export default async function verifyAndStoreMeMiddleware(req: NextRequest): Promise<NextResponse> {
	const path: string = req.nextUrl.pathname;
	const refreshToken: boolean = await cookieService.hasCookie('refreshToken');

	const isRouteMatch: (routes: string[]) => boolean = (routes: string[]): boolean =>
		routes.some((route: string): boolean => route !== '/' && path.startsWith(route));
	const isPublicRoute: boolean = isRouteMatch(PUBLIC_ROUTES);
	const isVerifyRoute: boolean = isRouteMatch(VERIFY_ROUTES);
	const isAdminRoute: boolean = isRouteMatch(ADMIN_ROUTES);

	if (!refreshToken) {
		return (isPublicRoute && path !== '/') || (isVerifyRoute && !path.endsWith('/verify-email')) ? NextResponse.next() : nextRequestRedirect('/login', req);
	}

	const nextResponse: NextResponse = NextResponse.next();

	const meData: MeObjectResponseUsersApiInterface | null = await validationService.validateAndGetMe(nextResponse);

	if (!meData || !meData.id || !meData.email || meData.roles.length < 1 || !meData.firstName || !meData.lastName) {
		await cookieService.deleteAuthCookies();
		return isPublicRoute || (isVerifyRoute && !path.endsWith('/verify-email')) ? NextResponse.next() : nextRequestRedirect('/login', req);
	}

	if (isVerifyRoute && meData.emailVerifiedAt) {
		return nextRequestRedirect('/dashboard', req);
	}

	if (path === '/') {
		return nextRequestRedirect('/dashboard', req);
	}

	if (isPublicRoute && !req.nextUrl.pathname.startsWith('/dashboard')) {
		return nextRequestRedirect('/dashboard', req);
	}

	if (isAdminRoute && !meData.roles.includes(RolesEnum.ADMIN)) {
		return nextRequestRedirect('/unauthorized', req);
	}

	if (!meData.emailVerifiedAt && !req.nextUrl.pathname.startsWith('/verify-email')) {
		return nextRequestRedirect('/verify-email', req);
	}

	await cookieService.setCookie('meData', JSON.stringify(meData), 'session', '/', nextResponse);

	return nextResponse;
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|favicon\\.ico).*)'],
};
