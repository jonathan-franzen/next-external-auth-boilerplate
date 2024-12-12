import LoginRequestAuthApiInterface from '@/interfaces/api/auth/request/login.request.auth.api.interface';
import LoginResponseAuthApiInterface from '@/interfaces/api/auth/response/login.response.auth.api.interface';
import apiService from '@/services/api';
import cookieService from '@/services/cookie';
import apiRouteErrorHandler from '@/utils/api-route-error-handler';
import { AxiosResponse } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse> {
	try {
		const credentials: LoginRequestAuthApiInterface = await request.json();

		const response: AxiosResponse<LoginResponseAuthApiInterface> = await apiService.postLogin(credentials);

		await cookieService.setCookie('accessToken', response.data.accessToken);

		return NextResponse.json({ message: response.data.message }, { status: response.status });
	} catch (err) {
		return apiRouteErrorHandler(err, 'Unable to login.');
	}
}
