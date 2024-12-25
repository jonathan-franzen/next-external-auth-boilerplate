import SendResetPasswordEmailRequestAuthApiInterface from '@/interfaces/api/auth/request/send-reset-password-email.request.auth.api.interface';
import SendResetPasswordEmailResponseAuthApiInterface from '@/interfaces/api/auth/response/send-reset-password-email.response.auth.api.interface';
import ErrorOtherGeneralInternalApiInterface from '@/interfaces/internal-api/general/other/error.other.general.internal-api.interface';
import ErrorResponseGeneralInternalApiInterface from '@/interfaces/internal-api/general/response/error.response.general.internal-api.interface';
import MessageResponseGeneralInternalApiInterface from '@/interfaces/internal-api/general/response/message.response.general.internal-api.interface';
import apiService from '@/services/api';
import apiRouteErrorHandler from '@/utils/api-route-error-handler';
import { AxiosResponse } from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse<MessageResponseGeneralInternalApiInterface | ErrorResponseGeneralInternalApiInterface>> {
	try {
		const sendResetPasswordData: SendResetPasswordEmailRequestAuthApiInterface = await request.json();

		const response: AxiosResponse<SendResetPasswordEmailResponseAuthApiInterface> = await apiService.postSendResetPasswordEmail(sendResetPasswordData);

		return NextResponse.json({ message: response.data.message }, { status: response.status });
	} catch (err) {
		const errResponse: ErrorOtherGeneralInternalApiInterface = apiRouteErrorHandler(err, 'Unable to send email.');
		return NextResponse.json({ error: errResponse.error }, { status: errResponse.status });
	}
}
