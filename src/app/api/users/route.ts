import UserResponseUsersApiInterface from '@/interfaces/api/users/response/user.response.users.api.interface';
import ErrorOtherGeneralInternalApiInterface from '@/interfaces/internal-api/general/other/error.other.general.internal-api.interface';
import ErrorResponseGeneralInternalApiInterface from '@/interfaces/internal-api/general/response/error.response.general.internal-api.interface';
import apiService from '@/services/api';
import apiRouteErrorHandler from '@/utils/api-route-error-handler';
import { AxiosResponse } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse<UserResponseUsersApiInterface | ErrorResponseGeneralInternalApiInterface>> {
	try {
		const pageParam: string | null = request.nextUrl.searchParams.get('page');
		const page: number | undefined = pageParam ? parseInt(pageParam) : undefined;

		const limitParam: string | null = request.nextUrl.searchParams.get('limit');
		const limit: number | undefined = limitParam ? parseInt(limitParam) : undefined;

		const sortBy: string | undefined = request.nextUrl.searchParams.get('sortBy') || undefined;

		const response: AxiosResponse<UserResponseUsersApiInterface> = await apiService.getUsers({ page, limit, sortBy }, true);

		return NextResponse.json(response.data, { status: response.status });
	} catch (err) {
		const errResponse: ErrorOtherGeneralInternalApiInterface = apiRouteErrorHandler(err, 'Unable to get users.');
		return NextResponse.json({ error: errResponse.error }, { status: errResponse.status });
	}
}
