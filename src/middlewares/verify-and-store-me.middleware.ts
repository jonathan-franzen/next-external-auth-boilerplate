import { ADMIN_ROUTES, PUBLIC_ROUTES, VERIFY_ROUTES } from '@/constants/routes.constants';
import RolesEnum from '@/enums/roles.enum';
import MeResponseUsersApiInterface from '@/interfaces/api/users/response/me.response.users.api.interface';
import MeObjectResponseUsersApiInterface from '@/interfaces/api/users/response/objects/me.object.response.users.api.interface';
import apiService from '@/services/api';
import cookieService from '@/services/cookie';
import middlewareRedirect from '@/utils/middleware-redirect';
import { AxiosResponse } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

async function verifyAndStoreMeMiddleware(req: NextRequest): Promise<NextResponse> {
	const path: string = req.nextUrl.pathname;
	const refreshToken: boolean = await cookieService.hasCookie('refreshToken');

	const isRouteMatch: (routes: string[]) => boolean = (routes: string[]): boolean =>
		routes.some((route: string): boolean => route !== '/' && path.startsWith(route));
	const isPublicRoute: boolean = isRouteMatch(PUBLIC_ROUTES);
	const isVerifyRoute: boolean = isRouteMatch(VERIFY_ROUTES);
	const isAdminRoute: boolean = isRouteMatch(ADMIN_ROUTES);

	const nextResponse: NextResponse = NextResponse.next();

	if (!refreshToken) {
		return (isPublicRoute && path !== '/') || (isVerifyRoute && !path.endsWith('/verify-email'))
			? NextResponse.next()
			: middlewareRedirect('/login', req, nextResponse);
	}

	try {
		const response: AxiosResponse<MeResponseUsersApiInterface> = await apiService.getMeUsers(true, nextResponse);

		const meData: MeObjectResponseUsersApiInterface = response.data.me;

		if (!meData || !meData.id || !meData.email || meData.roles.length < 1 || !meData.firstName || !meData.lastName) {
			await cookieService.deleteAuthCookies();
			return isPublicRoute || (isVerifyRoute && !path.endsWith('/verify-email')) ? NextResponse.next() : middlewareRedirect('/login', req, nextResponse);
		}

		if (isVerifyRoute && meData.emailVerifiedAt) {
			return middlewareRedirect('/dashboard', req, nextResponse);
		}

		if (path === '/') {
			return middlewareRedirect('/dashboard', req, nextResponse);
		}

		if (isPublicRoute && !req.nextUrl.pathname.startsWith('/dashboard')) {
			return middlewareRedirect('/dashboard', req, nextResponse);
		}

		if (isAdminRoute && !meData.roles.includes(RolesEnum.ADMIN)) {
			return middlewareRedirect('/unauthorized', req, nextResponse);
		}

		if (!meData.emailVerifiedAt && !req.nextUrl.pathname.startsWith('/verify-email')) {
			return middlewareRedirect('/verify-email', req, nextResponse);
		}

		await cookieService.setCookie('meData', JSON.stringify(meData), 'session', '/', nextResponse);

		return nextResponse;
	} catch (error) {
		await cookieService.deleteAuthCookies();
		return middlewareRedirect('/login', req, nextResponse);
	}
}

export default verifyAndStoreMeMiddleware;
