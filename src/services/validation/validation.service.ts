import MeObjectResponseUsersApiInterface from '@/interfaces/api/users/response/objects/me.object.response.users.api.interface';
import apiService from '@/services/api';
import CookieService from '@/services/cookie/cookie.service';
import { NextResponse } from 'next/server';
import { XiorError as AxiosError } from 'xior';

class ValidationService {
	constructor(private readonly cookieService: CookieService) {}

	private async refreshTokenAndGetUser(res: NextResponse): Promise<MeObjectResponseUsersApiInterface | null> {
		const refreshResponse = await apiService.postRefresh(res);
		const { accessToken } = refreshResponse.data;

		if (!accessToken) {
			return null;
		}

		await this.cookieService.setCookie('accessToken', accessToken, 60 * 60 * 1000, '/', res);

		const meResponse = await apiService.getMeUsers(accessToken);
		return meResponse.data.me;
	}

	async validateAndGetMe(res: NextResponse): Promise<MeObjectResponseUsersApiInterface | null> {
		const accessToken: string | null = await this.cookieService.getCookie('accessToken');

		try {
			if (accessToken) {
				const response = await apiService.getMeUsers(accessToken);
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
