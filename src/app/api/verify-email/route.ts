import VerifyEmailRequestAuthInternalApiInterface from '@/interfaces/internal-api/auth/request/verify-email.request.auth.internal-api.interface';
import apiService from '@/services/api';
import apiRouteErrorHandler from '@/utils/api-route-error-handler';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
	try {
		const { verifyEmailToken }: VerifyEmailRequestAuthInternalApiInterface = await request.json();

		const response = await apiService.postVerifyEmail(verifyEmailToken);

		return NextResponse.json({ message: response.data.message }, { status: response.status });
	} catch (err) {
		return apiRouteErrorHandler(err, 'Unable to verify email.');
	}
}
