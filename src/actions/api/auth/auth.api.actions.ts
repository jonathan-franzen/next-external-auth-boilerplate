'use server';

import { REFRESH_TOKEN_COOKIE_NAME } from '@/constants/cookies.constants';
import { BACKEND_URL } from '@/constants/environment.constants';
import {
	RequestPostLoginApiInterface,
	RequestPostRegisterApiInterface,
	RequestPostResendVerifyEmailApiInterface,
	RequestPostResetPasswordApiInterface,
	RequestPostTokenResetPasswordApiInterface,
	ResponseGetTokenResetPasswordApiInterface,
	ResponsePostLoginApiInterface,
	ResponsePostRefreshApiInterface,
	ResponsePostRegisterApiInterface,
	ResponsePostResendVerifyEmailApiInterface,
	ResponsePostResetPasswordApiInterface,
	ResponsePostTokenResetPasswordApiInterface,
	ResponsePostTokenVerifyEmailApiInterface,
} from '@/interfaces/api/auth/auth.api.interfaces';
import { fetchRequest, makeRequest } from '@/services/fetch/fetch.service';
import { getAuthSessionValue } from '@/services/iron-session/iron-session.service';
import buildUrl from '@/utils/build-url';
import { AuthSessionData, IronSession } from 'iron-session';

export async function deleteLogoutApiAction(): Promise<void> {
	const url = buildUrl(BACKEND_URL, '/logout');
	const refreshToken = await getAuthSessionValue('refreshToken');

	const config = {
		method: 'DELETE',
		...(refreshToken && { headers: { Cookie: `${REFRESH_TOKEN_COOKIE_NAME}=${refreshToken}` } }),
		credentials: 'include' as RequestCredentials,
	};

	await makeRequest<void>(() => fetchRequest(url, config, true));
}

export async function getTokenResetPasswordApiAction(resetPasswordToken: string): Promise<ResponseGetTokenResetPasswordApiInterface> {
	const url = buildUrl(BACKEND_URL, `/reset-password/${resetPasswordToken}`);
	const config = {
		method: 'GET',
	};

	return await makeRequest<ResponseGetTokenResetPasswordApiInterface>(() => fetchRequest(url, config));
}

export async function postLoginApiAction(data: RequestPostLoginApiInterface): Promise<ResponsePostLoginApiInterface> {
	const url = buildUrl(BACKEND_URL, '/login');
	const config = {
		body: JSON.stringify(data),
		credentials: 'include' as RequestCredentials,
		method: 'POST',
	};

	return await makeRequest<ResponsePostLoginApiInterface>(() => fetchRequest(url, config, true));
}

export async function postRefreshApiAction(session?: IronSession<AuthSessionData>): Promise<ResponsePostRefreshApiInterface> {
	const url = buildUrl(BACKEND_URL, '/refresh');
	const refreshToken = session?.refreshToken || (await getAuthSessionValue('refreshToken'));

	const config = {
		method: 'POST',
		...(refreshToken && { headers: { Cookie: `${REFRESH_TOKEN_COOKIE_NAME}=${refreshToken}` } }),
		credentials: 'include' as RequestCredentials,
	};

	return await makeRequest<ResponsePostRefreshApiInterface>(() => fetchRequest(url, config, true, session));
}

export async function postRegisterApiAction(data: RequestPostRegisterApiInterface): Promise<ResponsePostRegisterApiInterface> {
	const url = buildUrl(BACKEND_URL, '/register');
	const config = {
		body: JSON.stringify(data),
		method: 'POST',
	};

	return await makeRequest<ResponsePostRegisterApiInterface>(() => fetchRequest(url, config));
}

export async function postResendVerifyEmailApiAction(data: RequestPostResendVerifyEmailApiInterface): Promise<ResponsePostResendVerifyEmailApiInterface> {
	const url = buildUrl(BACKEND_URL, '/resend-verify-email');
	const config = {
		body: JSON.stringify(data),
		method: 'POST',
	};

	return await makeRequest<ResponsePostResendVerifyEmailApiInterface>(() => fetchRequest(url, config));
}

export async function postResetPasswordApiAction(data: RequestPostResetPasswordApiInterface): Promise<ResponsePostResetPasswordApiInterface> {
	const url = buildUrl(BACKEND_URL, '/reset-password');
	const config = {
		body: JSON.stringify(data),
		method: 'POST',
	};

	return await makeRequest<ResponsePostResetPasswordApiInterface>(() => fetchRequest(url, config));
}

export async function postTokenResetPasswordApiAction(
	resetPasswordToken: string,
	data: RequestPostTokenResetPasswordApiInterface,
): Promise<ResponsePostTokenResetPasswordApiInterface> {
	const url = buildUrl(BACKEND_URL, `/reset-password/${resetPasswordToken}`);
	const config = {
		body: JSON.stringify(data),
		method: 'POST',
	};

	return await makeRequest<ResponsePostTokenResetPasswordApiInterface>(() => fetchRequest(url, config));
}

export async function postTokenVerifyEmailApiAction(verifyEmailToken: string): Promise<ResponsePostTokenVerifyEmailApiInterface> {
	const url = buildUrl(BACKEND_URL, `/verify-email/${verifyEmailToken}`);
	const config = {
		method: 'POST',
	};

	return await makeRequest<ResponsePostTokenVerifyEmailApiInterface>(() => fetchRequest(url, config));
}
