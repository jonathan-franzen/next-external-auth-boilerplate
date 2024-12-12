import RegisterRequestAuthApiInterface from '@/interfaces/api/auth/request/register.request.auth.api.interface';
import RegisterResponseAuthApiInterface from '@/interfaces/api/auth/response/register.response.auth.api.interface';
import apiService from '@/services/api';
import apiRouteErrorHandler from '@/utils/api-route-error-handler';
import { AxiosResponse } from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
	try {
		const registerData: RegisterRequestAuthApiInterface = await request.json();

		const response: AxiosResponse<RegisterResponseAuthApiInterface> = await apiService.postRegister(registerData);

		return NextResponse.json({ message: response.data.message }, { status: response.status });
	} catch (err) {
		return apiRouteErrorHandler(err, 'Unable to register.');
	}
}
