'use server';

import { REFRESH_TOKEN_COOKIE } from '@/constants/cookies.constants';
import { BACKEND_URL } from '@/constants/environment.constants';
import {
	RequestPostLoginAuthApiInterface,
	RequestPostRegisterAuthApiInterface,
	RequestPostResetPasswordAuthApiInterface,
	RequestPostTokenResetPasswordAuthApiInterface,
	RequestResendVerifyEmailAuthApiInterface,
	ResponseGetTokenResetPasswordAuthApiInterface,
	ResponsePostLoginAuthApiInterface,
	ResponsePostRefreshAuthApiInterface,
	ResponsePostRegisterAuthApiInterface,
	ResponsePostResetPasswordAuthApiInterface,
	ResponsePostTokenResetPasswordAuthApiInterface,
	ResponseResendVerifyEmailAuthApiInterface,
	ResponseTokenVerifyEmailAuthApiInterface,
} from '@/interfaces/api/auth/auth.api.interfaces';
import buildUrl from '@/utils/build-url';
import { fetchRequest, makeRequest } from '@/utils/fetch';
import { getAuthSessionValue } from '@/utils/iron-session';
import { AuthSessionData, IronSession } from 'iron-session';

export async function postRegisterAuthApiAction(data: RequestPostRegisterAuthApiInterface): Promise<ResponsePostRegisterAuthApiInterface> {
	const url: string = buildUrl(BACKEND_URL, '/register');
	const config: RequestInit = {
		method: 'POST',
		body: JSON.stringify(data),
	};

	return await makeRequest<ResponsePostRegisterAuthApiInterface>((): Promise<Response> => fetchRequest(url, config));
}

export async function postResendVerifyEmailAuthApiAction(data: RequestResendVerifyEmailAuthApiInterface): Promise<ResponseResendVerifyEmailAuthApiInterface> {
	const url: string = buildUrl(BACKEND_URL, '/resend-verify-email');
	const config: RequestInit = {
		method: 'POST',
		body: JSON.stringify(data),
	};

	return await makeRequest<ResponseResendVerifyEmailAuthApiInterface>((): Promise<Response> => fetchRequest(url, config));
}

export async function postTokenVerifyEmailAuthApiAction(verifyEmailToken: string): Promise<ResponseTokenVerifyEmailAuthApiInterface> {
	const url: string = buildUrl(BACKEND_URL, `/verify-email/${verifyEmailToken}`);
	const config: RequestInit = {
		method: 'POST',
	};

	return await makeRequest<ResponseTokenVerifyEmailAuthApiInterface>((): Promise<Response> => fetchRequest(url, config));
}

export async function postLoginAuthApiAction(data: RequestPostLoginAuthApiInterface): Promise<ResponsePostLoginAuthApiInterface> {
	const url: string = buildUrl(BACKEND_URL, '/login');
	const config: RequestInit = {
		method: 'POST',
		body: JSON.stringify(data),
		credentials: 'include' as RequestCredentials,
	};

	return await makeRequest<ResponsePostLoginAuthApiInterface>((): Promise<Response> => fetchRequest(url, config, true));
}

export async function postResetPasswordAuthApiAction(data: RequestPostResetPasswordAuthApiInterface): Promise<ResponsePostResetPasswordAuthApiInterface> {
	const url: string = buildUrl(BACKEND_URL, '/reset-password');
	const config: RequestInit = {
		method: 'POST',
		body: JSON.stringify(data),
	};

	return await makeRequest<ResponsePostResetPasswordAuthApiInterface>((): Promise<Response> => fetchRequest(url, config));
}

export async function getTokenResetPasswordAuthApiAction(resetPasswordToken: string): Promise<ResponseGetTokenResetPasswordAuthApiInterface> {
	const url: string = buildUrl(BACKEND_URL, `/reset-password/${resetPasswordToken}`);
	const config: RequestInit = {
		method: 'GET',
	};

	return await makeRequest<ResponseGetTokenResetPasswordAuthApiInterface>((): Promise<Response> => fetchRequest(url, config));
}

export async function postTokenResetPasswordAuthApiAction(
	resetPasswordToken: string,
	data: RequestPostTokenResetPasswordAuthApiInterface,
): Promise<ResponsePostTokenResetPasswordAuthApiInterface> {
	const url: string = buildUrl(BACKEND_URL, `/reset-password/${resetPasswordToken}`);
	const config: RequestInit = {
		method: 'POST',
		body: JSON.stringify(data),
	};

	return await makeRequest<ResponsePostTokenResetPasswordAuthApiInterface>((): Promise<Response> => fetchRequest(url, config));
}

export async function postRefreshAuthApiAction(session?: IronSession<AuthSessionData>): Promise<ResponsePostRefreshAuthApiInterface> {
	const url: string = buildUrl(BACKEND_URL, '/refresh');
	const refreshToken: string | undefined = await getAuthSessionValue('refreshToken');

	const config: RequestInit = {
		method: 'POST',
		...(refreshToken && { headers: { Cookie: `${REFRESH_TOKEN_COOKIE}=${refreshToken}` } }),
		credentials: 'include' as RequestCredentials,
	};

	return await makeRequest<ResponsePostRefreshAuthApiInterface>((): Promise<Response> => fetchRequest(url, config, true, session));
}

export async function deleteLogoutAuthApiAction(): Promise<void> {
	const url: string = buildUrl(BACKEND_URL, '/logout');
	const refreshToken: string | undefined = await getAuthSessionValue('refreshToken');

	const config: RequestInit = {
		method: 'DELETE',
		...(refreshToken && { headers: { Cookie: `${REFRESH_TOKEN_COOKIE}=${refreshToken}` } }),
		credentials: 'include' as RequestCredentials,
	};

	await makeRequest<void>((): Promise<Response> => fetchRequest(url, config, true));
}
