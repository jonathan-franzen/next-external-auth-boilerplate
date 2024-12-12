import SendResetPasswordEmailRequestAuthApiInterface from '@/interfaces/api/auth/request/send-reset-password-email.request.auth.api.interface';
import SendResetPasswordEmailResponseAuthApiInterface from '@/interfaces/api/auth/response/send-reset-password-email.response.auth.api.interface';
import apiService from '@/services/api';
import apiRouteErrorHandler from '@/utils/api-route-error-handler';
import { AxiosResponse } from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
	try {
		const sendResetPasswordData: SendResetPasswordEmailRequestAuthApiInterface = await request.json();

		const response: AxiosResponse<SendResetPasswordEmailResponseAuthApiInterface> = await apiService.postSendResetPasswordEmail(sendResetPasswordData);

		return NextResponse.json({ message: response.data.message }, { status: response.status });
	} catch (err) {
		return apiRouteErrorHandler(err, 'Unable to send email.');
	}
}
