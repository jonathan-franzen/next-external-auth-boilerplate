import LoginRequestAuthApiInterface from '@/interfaces/api/auth/request/login.request.auth.api.interface';
import LoginResponseAuthApiInterface from '@/interfaces/api/auth/response/login.response.auth.api.interface';
import ErrorOtherGeneralInternalApiInterface from '@/interfaces/internal-api/general/other/error.other.general.internal-api.interface';
import ErrorResponseGeneralInternalApiInterface from '@/interfaces/internal-api/general/response/error.response.general.internal-api.interface';
import MessageResponseGeneralInternalApiInterface from '@/interfaces/internal-api/general/response/message.response.general.internal-api.interface';
import apiService from '@/services/api';
import cookieService from '@/services/cookie';
import apiRouteErrorHandler from '@/utils/api-route-error-handler';
import { AxiosResponse } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse<MessageResponseGeneralInternalApiInterface | ErrorResponseGeneralInternalApiInterface>> {
	try {
		const data: LoginRequestAuthApiInterface = await request.json();

		const response: AxiosResponse<LoginResponseAuthApiInterface> = await apiService.postLogin(data);

		await cookieService.setCookie('accessToken', response.data.accessToken);

		return NextResponse.json({ message: response.data.message }, { status: response.status });
	} catch (err) {
		const errResponse: ErrorOtherGeneralInternalApiInterface = apiRouteErrorHandler(err, 'Unable to login.');
		return NextResponse.json({ error: errResponse.error }, { status: errResponse.status });
	}
}
