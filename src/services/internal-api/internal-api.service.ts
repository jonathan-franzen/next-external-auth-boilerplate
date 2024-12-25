import { PUBLIC_FRONTEND_URL } from '@/constants/environment.constants';
import LoginRequestAuthApiInterface from '@/interfaces/api/auth/request/login.request.auth.api.interface';
import RegisterRequestAuthApiInterface from '@/interfaces/api/auth/request/register.request.auth.api.interface';
import ResendVerifyEmailRequestAuthApiInterface from '@/interfaces/api/auth/request/resend-verify-email.request.auth.api.interface';
import SendResetPasswordEmailRequestAuthApiInterface from '@/interfaces/api/auth/request/send-reset-password-email.request.auth.api.interface';
import GetUsersRequestAuthApiInterface from '@/interfaces/api/users/request/get-users.request.auth.api.interface';
import UserResponseUsersApiInterface from '@/interfaces/api/users/response/user.response.users.api.interface';
import ResetPasswordRequestAuthInternalApiInterface from '@/interfaces/internal-api/auth/request/reset-password.request.auth.internal-api.interface';
import VerifyEmailRequestAuthInternalApiInterface from '@/interfaces/internal-api/auth/request/verify-email.request.auth.internal-api.interface';
import MessageResponseGeneralInternalApiInterface from '@/interfaces/internal-api/general/response/message.response.general.internal-api.interface';
import buildUrl from '@/utils/build-url';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';

class InternalApiService {
	constructor(private readonly axiosInternalInstance: AxiosInstance) {}

	private async axiosInternalRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		try {
			return await this.axiosInternalInstance(config);
		} catch (err) {
			if (isAxiosError(err)) {
				throw err;
			}

			throw new Error('Something went wrong.');
		}
	}

	async postRegister(data: RegisterRequestAuthApiInterface): Promise<AxiosResponse<MessageResponseGeneralInternalApiInterface>> {
		const config = {
			method: 'POST',
			url: '/api/register',
			data,
		};

		return await this.axiosInternalRequest<MessageResponseGeneralInternalApiInterface>(config);
	}

	async postLogin(data: LoginRequestAuthApiInterface): Promise<AxiosResponse<MessageResponseGeneralInternalApiInterface>> {
		const config = {
			method: 'POST',
			url: '/api/login',
			data,
		};

		return await this.axiosInternalRequest<MessageResponseGeneralInternalApiInterface>(config);
	}

	async postVerifyEmail(data: VerifyEmailRequestAuthInternalApiInterface): Promise<AxiosResponse<MessageResponseGeneralInternalApiInterface>> {
		const config = {
			method: 'POST',
			url: '/api/verify-email',
			data,
		};

		return await this.axiosInternalRequest<MessageResponseGeneralInternalApiInterface>(config);
	}

	async postResendVerifyEmail(data: ResendVerifyEmailRequestAuthApiInterface): Promise<AxiosResponse<MessageResponseGeneralInternalApiInterface>> {
		const config = {
			method: 'POST',
			url: '/api/resend-verify-email',
			data,
		};

		return await this.axiosInternalRequest<MessageResponseGeneralInternalApiInterface>(config);
	}

	async postResetPassword(data: ResetPasswordRequestAuthInternalApiInterface): Promise<AxiosResponse<MessageResponseGeneralInternalApiInterface>> {
		const config = {
			method: 'POST',
			url: '/api/reset-password',
			data,
		};

		return await this.axiosInternalRequest<MessageResponseGeneralInternalApiInterface>(config);
	}

	async postSendResetPasswordEmail(data: SendResetPasswordEmailRequestAuthApiInterface): Promise<AxiosResponse<MessageResponseGeneralInternalApiInterface>> {
		const config = {
			method: 'POST',
			url: '/api/send-reset-password-email',
			data,
		};

		return await this.axiosInternalRequest<MessageResponseGeneralInternalApiInterface>(config);
	}

	async deleteLogout(): Promise<AxiosResponse<MessageResponseGeneralInternalApiInterface>> {
		const config = {
			method: 'DELETE',
			url: '/api/logout',
		};

		return await this.axiosInternalRequest<MessageResponseGeneralInternalApiInterface>(config);
	}

	// Users

	async getUsers(data: GetUsersRequestAuthApiInterface): Promise<AxiosResponse<UserResponseUsersApiInterface>> {
		const url: string = buildUrl(PUBLIC_FRONTEND_URL, '/api/users', {
			...(data.page && { page: data.page.toString() }),
			...(data.limit && { limit: data.limit.toString() }),
		});

		const config = {
			method: 'GET',
			url: url,
		};

		return await this.axiosInternalRequest<UserResponseUsersApiInterface>(config);
	}
}

export default InternalApiService;
