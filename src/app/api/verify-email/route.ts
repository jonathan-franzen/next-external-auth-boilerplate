import VerifyEmailResponseAuthApiInterface from '@/interfaces/api/auth/response/verify-email.response.auth.api.interface';
import VerifyEmailRequestAuthInternalApiInterface from '@/interfaces/internal-api/auth/request/verify-email.request.auth.internal-api.interface';
import ErrorOtherGeneralInternalApiInterface from '@/interfaces/internal-api/general/other/error.other.general.internal-api.interface';
import ErrorResponseGeneralInternalApiInterface from '@/interfaces/internal-api/general/response/error.response.general.internal-api.interface';
import MessageResponseGeneralInternalApiInterface from '@/interfaces/internal-api/general/response/message.response.general.internal-api.interface';
import apiService from '@/services/api';
import apiRouteErrorHandler from '@/utils/api-route-error-handler';
import { AxiosResponse } from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse<MessageResponseGeneralInternalApiInterface | ErrorResponseGeneralInternalApiInterface>> {
	try {
		const { verifyEmailToken }: VerifyEmailRequestAuthInternalApiInterface = await request.json();

		const response: AxiosResponse<VerifyEmailResponseAuthApiInterface> = await apiService.postVerifyEmail(verifyEmailToken);

		return NextResponse.json({ message: response.data.message }, { status: response.status });
	} catch (err) {
		const errResponse: ErrorOtherGeneralInternalApiInterface = apiRouteErrorHandler(err, 'Unable to verify email.');
		return NextResponse.json({ error: errResponse.error }, { status: errResponse.status });
	}
}
