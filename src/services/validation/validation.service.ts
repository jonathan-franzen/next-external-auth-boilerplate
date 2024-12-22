import RefreshResponseAuthApiInterface from '@/interfaces/api/auth/response/refresh.response.auth.api.interface';
import MeResponseUsersApiInterface from '@/interfaces/api/users/response/me.response.users.api.interface';
import MeObjectResponseUsersApiInterface from '@/interfaces/api/users/response/objects/me.object.response.users.api.interface';
import apiService from '@/services/api';
import CookieService from '@/services/cookie/cookie.service';
import { AxiosError, AxiosResponse } from 'axios';
import { NextResponse } from 'next/server';

class ValidationService {
	constructor(private readonly cookieService: CookieService) {}

	private async refreshTokenAndGetUser(res: NextResponse): Promise<MeObjectResponseUsersApiInterface | null> {
		const refreshResponse: AxiosResponse<RefreshResponseAuthApiInterface> = await apiService.postRefresh(res);
		const { accessToken } = refreshResponse.data;

		if (!accessToken) {
			return null;
		}

		await this.cookieService.setCookie('accessToken', accessToken, 60 * 60 * 1000, '/', res);

		const meResponse: AxiosResponse<MeResponseUsersApiInterface> = await apiService.getMeUsers(accessToken);
		return meResponse.data.me;
	}

	async validateAndGetMe(res: NextResponse): Promise<MeObjectResponseUsersApiInterface | null> {
		const accessToken: string | null = await this.cookieService.getCookie('accessToken');

		try {
			if (accessToken) {
				const response: AxiosResponse<MeResponseUsersApiInterface> = await apiService.getMeUsers(accessToken);
				return response.data.me;
			}
			return await this.refreshTokenAndGetUser(res);
		} catch (error) {
			if ((error as AxiosError)?.response?.status === 401) {
				return await this.refreshTokenAndGetUser(res);
			}
			return null;
		}
	}
}

export default ValidationService;
