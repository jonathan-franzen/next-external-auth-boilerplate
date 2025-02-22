'use server';

import { REFRESH_TOKEN_COOKIE_NAME } from '@/constants/cookies.constants';
import { BACKEND_URL } from '@/constants/environment.constants';
import {
	RequestPostLoginAuthApiInterface,
	RequestPostRegisterAuthApiInterface,
	RequestPostResendVerifyEmailAuthApiInterface,
	RequestPostResetPasswordAuthApiInterface,
	RequestPostTokenResetPasswordAuthApiInterface,
	ResponseGetTokenResetPasswordAuthApiInterface,
	ResponsePostLoginAuthApiInterface,
	ResponsePostRefreshAuthApiInterface,
	ResponsePostRegisterAuthApiInterface,
	ResponsePostResendVerifyEmailAuthApiInterface,
	ResponsePostResetPasswordAuthApiInterface,
	ResponsePostTokenResetPasswordAuthApiInterface,
	ResponsePostTokenVerifyEmailAuthApiInterface,
} from '@/interfaces/api/auth/auth.api.interfaces';
import { fetchRequest, makeRequest } from '@/services/fetch/fetch.service';
import { getAuthSessionValue } from '@/services/iron-session/iron-session.service';
import buildUrl from '@/utils/build-url';
import { AuthSessionData, IronSession } from 'iron-session';

export async function deleteLogoutAuthApiAction(): Promise<void> {
	const url = buildUrl(BACKEND_URL, '/logout');
	const refreshToken = await getAuthSessionValue('refreshToken');

	const config = {
		method: 'DELETE',
		...(refreshToken && { headers: { Cookie: `${REFRESH_TOKEN_COOKIE_NAME}=${refreshToken}` } }),
		credentials: 'include' as RequestCredentials,
	};

	await makeRequest<void>(() => fetchRequest(url, config, true));
}

export async function getTokenResetPasswordAuthApiAction(resetPasswordToken: string): Promise<ResponseGetTokenResetPasswordAuthApiInterface> {
	const url = buildUrl(BACKEND_URL, `/reset-password/${resetPasswordToken}`);
	const config = {
		method: 'GET',
	};

	return await makeRequest<ResponseGetTokenResetPasswordAuthApiInterface>(() => fetchRequest(url, config));
}

export async function postLoginAuthApiAction(data: RequestPostLoginAuthApiInterface): Promise<ResponsePostLoginAuthApiInterface> {
	const url = buildUrl(BACKEND_URL, '/login');
	const config = {
		body: JSON.stringify(data),
		credentials: 'include' as RequestCredentials,
		method: 'POST',
	};

	return await makeRequest<ResponsePostLoginAuthApiInterface>(() => fetchRequest(url, config, true));
}

export async function postRefreshAuthApiAction(session?: IronSession<AuthSessionData>): Promise<ResponsePostRefreshAuthApiInterface> {
	const url = buildUrl(BACKEND_URL, '/refresh');
	const refreshToken = session?.refreshToken || (await getAuthSessionValue('refreshToken'));

	const config = {
		method: 'POST',
		...(refreshToken && { headers: { Cookie: `${REFRESH_TOKEN_COOKIE_NAME}=${refreshToken}` } }),
		credentials: 'include' as RequestCredentials,
	};

	return await makeRequest<ResponsePostRefreshAuthApiInterface>(() => fetchRequest(url, config, true, session));
}

export async function postRegisterAuthApiAction(data: RequestPostRegisterAuthApiInterface): Promise<ResponsePostRegisterAuthApiInterface> {
	const url = buildUrl(BACKEND_URL, '/register');
	const config = {
		body: JSON.stringify(data),
		method: 'POST',
	};

	return await makeRequest<ResponsePostRegisterAuthApiInterface>(() => fetchRequest(url, config));
}

export async function postResendVerifyEmailAuthApiAction(
	data: RequestPostResendVerifyEmailAuthApiInterface,
): Promise<ResponsePostResendVerifyEmailAuthApiInterface> {
	const url = buildUrl(BACKEND_URL, '/resend-verify-email');
	const config = {
		body: JSON.stringify(data),
		method: 'POST',
	};

	return await makeRequest<ResponsePostResendVerifyEmailAuthApiInterface>(() => fetchRequest(url, config));
}

export async function postResetPasswordAuthApiAction(data: RequestPostResetPasswordAuthApiInterface): Promise<ResponsePostResetPasswordAuthApiInterface> {
	const url = buildUrl(BACKEND_URL, '/reset-password');
	const config = {
		body: JSON.stringify(data),
		method: 'POST',
	};

	return await makeRequest<ResponsePostResetPasswordAuthApiInterface>(() => fetchRequest(url, config));
}

export async function postTokenResetPasswordAuthApiAction(
	resetPasswordToken: string,
	data: RequestPostTokenResetPasswordAuthApiInterface,
): Promise<ResponsePostTokenResetPasswordAuthApiInterface> {
	const url = buildUrl(BACKEND_URL, `/reset-password/${resetPasswordToken}`);
	const config = {
		body: JSON.stringify(data),
		method: 'POST',
	};

	return await makeRequest<ResponsePostTokenResetPasswordAuthApiInterface>(() => fetchRequest(url, config));
}

export async function postTokenVerifyEmailAuthApiAction(verifyEmailToken: string): Promise<ResponsePostTokenVerifyEmailAuthApiInterface> {
	const url = buildUrl(BACKEND_URL, `/verify-email/${verifyEmailToken}`);
	const config = {
		method: 'POST',
	};

	return await makeRequest<ResponsePostTokenVerifyEmailAuthApiInterface>(() => fetchRequest(url, config));
}
