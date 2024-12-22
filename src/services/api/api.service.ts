import LoginRequestAuthApiInterface from '@/interfaces/api/auth/request/login.request.auth.api.interface';
import RegisterRequestAuthApiInterface from '@/interfaces/api/auth/request/register.request.auth.api.interface';
import ResendVerifyEmailRequestAuthApiInterface from '@/interfaces/api/auth/request/resend-verify-email.request.auth.api.interface';
import ResetPasswordRequestAuthApiInterface from '@/interfaces/api/auth/request/reset-password.request.auth.api.interface';
import SendResetPasswordEmailRequestAuthApiInterface from '@/interfaces/api/auth/request/send-reset-password-email.request.auth.api.interface';
import LoginResponseAuthApiInterface from '@/interfaces/api/auth/response/login.response.auth.api.interface';
import RefreshResponseAuthApiInterface from '@/interfaces/api/auth/response/refresh.response.auth.api.interface';
import RegisterResponseAuthApiInterface from '@/interfaces/api/auth/response/register.response.auth.api.interface';
import ResendVerifyEmailResponseAuthApiInterface from '@/interfaces/api/auth/response/resend-verify-email.response.auth.api.interface';
import ResetPasswordResponseAuthApiInterface from '@/interfaces/api/auth/response/reset-password.response.auth.api.interface';
import SendResetPasswordEmailResponseAuthApiInterface from '@/interfaces/api/auth/response/send-reset-password-email.response.auth.api.interface';
import VerifyEmailResponseAuthApiInterface from '@/interfaces/api/auth/response/verify-email.response.auth.api.interface';
import VerifyResetPasswordTokenResponseAuthApiInterface from '@/interfaces/api/auth/response/verify-reset-password-token.response.auth.api.interface';
import MeResponseUsersApiInterface from '@/interfaces/api/users/response/me.response.users.api.interface';
import UserResponseUsersApiInterface from '@/interfaces/api/users/response/user.response.users.api.interface';
import CookieService from '@/services/cookie/cookie.service';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

class ApiService {
	constructor(
		private readonly axiosExternalInstance: AxiosInstance,
		private readonly cookieService: CookieService,
	) {}

	private async axiosRequest<T>(config: AxiosRequestConfig, setCookies: boolean = false, res?: NextResponse): Promise<AxiosResponse<T>> {
		try {
			console.log(config.url);
			const response: AxiosResponse<T> = await this.axiosExternalInstance(config);

			if (setCookies) {
				const setCookieHeader: string[] | null = response.headers['set-cookie']
					? Array.isArray(response.headers['set-cookie'])
						? response.headers['set-cookie']
						: [response.headers['set-cookie']]
					: null;

				if (setCookieHeader) {
					await this.cookieService.setCookiesFromHeader(setCookieHeader, res);
				}
			}

			return response;
		} catch (err) {
			if (isAxiosError(err)) {
				if (setCookies) {
					const setCookieHeader: string[] | null = err.response?.headers['set-cookie']
						? Array.isArray(err.response.headers['set-cookie'])
							? err.response.headers['set-cookie']
							: [err.response.headers['set-cookie']]
						: null;

					if (setCookieHeader) {
						await this.cookieService.setCookiesFromHeader(setCookieHeader, res);
					}
				}
				throw err;
			}

			throw new Error('Something went wrong.');
		}
	}

	private async authenticatedApiRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		const accessToken: string | null = await this.cookieService.getCookie('accessToken');

		if (!accessToken) {
			await this.cookieService.deleteAuthCookies();
			redirect('/login');
		}

		const headers = {
			['Authorization']: `Bearer ${accessToken}`,
		};

		config = {
			...config,
			headers: {
				...config.headers,
				...headers,
			},
		};

		return await this.axiosRequest<T>(config);
	}

	async postRegister(data: RegisterRequestAuthApiInterface): Promise<AxiosResponse<RegisterResponseAuthApiInterface>> {
		const config = {
			method: 'POST',
			url: '/register',
			data,
		};

		return await this.axiosRequest<RegisterResponseAuthApiInterface>(config);
	}

	async postVerifyEmail(verifyEmailToken: string): Promise<AxiosResponse<VerifyEmailResponseAuthApiInterface>> {
		const config = {
			method: 'POST',
			url: `/verify-email/${verifyEmailToken}`,
		};

		return await this.axiosRequest<VerifyEmailResponseAuthApiInterface>(config);
	}

	async postResendVerifyEmail(data: ResendVerifyEmailRequestAuthApiInterface): Promise<AxiosResponse<ResendVerifyEmailResponseAuthApiInterface>> {
		const config = {
			method: 'POST',
			url: '/resend-verify-email',
			data,
		};

		return await this.axiosRequest<ResendVerifyEmailResponseAuthApiInterface>(config);
	}

	async postLogin(data: LoginRequestAuthApiInterface): Promise<AxiosResponse<LoginResponseAuthApiInterface>> {
		const config = {
			method: 'POST',
			url: '/login',
			data,
			withCredentials: true,
		};

		return await this.axiosRequest<LoginResponseAuthApiInterface>(config, true);
	}

	async postRefresh(res: NextResponse): Promise<AxiosResponse<RefreshResponseAuthApiInterface>> {
		const config = {
			method: 'POST',
			url: '/refresh',
			headers: { Cookie: await this.cookieService.getCookieStore() },
			withCredentials: true,
		};

		return await this.axiosRequest<RefreshResponseAuthApiInterface>(config, true, res);
	}

	async postSendResetPasswordEmail(
		data: SendResetPasswordEmailRequestAuthApiInterface,
	): Promise<AxiosResponse<SendResetPasswordEmailResponseAuthApiInterface>> {
		const config = {
			method: 'POST',
			url: '/reset-password',
			data,
		};

		return await this.axiosRequest<SendResetPasswordEmailResponseAuthApiInterface>(config);
	}

	async getVerifyResetPasswordToken(resetPasswordToken: string): Promise<AxiosResponse<VerifyResetPasswordTokenResponseAuthApiInterface>> {
		const config = {
			method: 'GET',
			url: `/reset-password/${resetPasswordToken}`,
		};

		return await this.axiosRequest<VerifyResetPasswordTokenResponseAuthApiInterface>(config);
	}

	async postResetPassword(
		resetPasswordToken: string,
		data: ResetPasswordRequestAuthApiInterface,
	): Promise<AxiosResponse<ResetPasswordResponseAuthApiInterface>> {
		const config = {
			method: 'POST',
			url: `/reset-password/${resetPasswordToken}`,
			data,
		};

		return await this.axiosRequest<ResetPasswordResponseAuthApiInterface>(config);
	}

	async deleteLogout(): Promise<AxiosResponse<void>> {
		const config = {
			method: 'DELETE',
			url: '/logout',
			headers: { Cookie: await this.cookieService.getCookieStore() },
			withCredentials: true,
		};

		return await this.axiosRequest<void>(config, true);
	}

	// /users start here

	async getUsers(): Promise<AxiosResponse<UserResponseUsersApiInterface>> {
		const config = { url: '/users', method: 'GET' };
		return await this.authenticatedApiRequest<UserResponseUsersApiInterface>(config);
	}

	async getMeUsers(accessToken: string): Promise<AxiosResponse<MeResponseUsersApiInterface>> {
		const config = {
			url: '/users/me',
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		};
		return await this.axiosRequest<MeResponseUsersApiInterface>(config);
	}
}

export default ApiService;
