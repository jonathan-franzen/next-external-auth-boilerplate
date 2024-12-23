import ResendVerifyEmailRequestAuthApiInterface from '@/interfaces/api/auth/request/resend-verify-email.request.auth.api.interface';
import apiService from '@/services/api';
import apiRouteErrorHandler from '@/utils/api-route-error-handler';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
	try {
		const resendVerifyEmailData: ResendVerifyEmailRequestAuthApiInterface = await request.json();

		const response = await apiService.postResendVerifyEmail(resendVerifyEmailData);

		return NextResponse.json({ message: response.data.message }, { status: response.status });
	} catch (err) {
		return apiRouteErrorHandler(err, 'Unable to send email.');
	}
}
