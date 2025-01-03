'use server';

import { getCookie } from '@/actions/cookies/cookies.actions';
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
import { fetchRequest } from '@/utils/fetch';
import { isHttpError } from 'http-errors';
import { NextResponse } from 'next/server';

export async function postRegisterAuthApiAction(data: RequestPostRegisterAuthApiInterface): Promise<ResponsePostRegisterAuthApiInterface> {
	const url: string = buildUrl(BACKEND_URL, '/register');
	const config: RequestInit = {
		method: 'POST',
		body: JSON.stringify(data),
	};

	try {
		const response: Response = await fetchRequest(url, config);
		return response.json();
	} catch (err) {
		if (isHttpError(err)) {
			throw new Error(err.message || 'Something went wrong.');
		}

		throw new Error('Something went wrong.');
	}
}

export async function postResendVerifyEmailAuthApiAction(data: RequestResendVerifyEmailAuthApiInterface): Promise<ResponseResendVerifyEmailAuthApiInterface> {
	const url: string = buildUrl(BACKEND_URL, '/resend-verify-email');
	const config: RequestInit = {
		method: 'POST',
		body: JSON.stringify(data),
	};

	try {
		const response: Response = await fetchRequest(url, config);
		return response.json();
	} catch (err) {
		if (isHttpError(err)) {
			throw new Error(err.message || 'Something went wrong.');
		}

		throw new Error('Something went wrong.');
	}
}

export async function postTokenVerifyEmailAuthApiAction(verifyEmailToken: string): Promise<ResponseTokenVerifyEmailAuthApiInterface> {
	const url: string = buildUrl(BACKEND_URL, `/verify-email/${verifyEmailToken}`);
	const config: RequestInit = {
		method: 'POST',
	};

	try {
		const response: Response = await fetchRequest(url, config);
		return response.json();
	} catch (err) {
		if (isHttpError(err)) {
			throw new Error(err.message || 'Something went wrong.');
		}

		throw new Error('Something went wrong.');
	}
}

export async function postLoginAuthApiAction(data: RequestPostLoginAuthApiInterface): Promise<ResponsePostLoginAuthApiInterface> {
	const url: string = buildUrl(BACKEND_URL, '/login');
	const config: RequestInit = {
		method: 'POST',
		body: JSON.stringify(data),
		credentials: 'include' as RequestCredentials,
	};

	try {
		const response: Response = await fetchRequest(url, config, true);
		return response.json();
	} catch (err) {
		if (isHttpError(err)) {
			throw new Error(err.message || 'Something went wrong.');
		}

		throw new Error('Something went wrong.');
	}
}

export async function postResetPasswordAuthApiAction(data: RequestPostResetPasswordAuthApiInterface): Promise<ResponsePostResetPasswordAuthApiInterface> {
	const url: string = buildUrl(BACKEND_URL, '/reset-password');
	const config: RequestInit = {
		method: 'POST',
		body: JSON.stringify(data),
	};

	try {
		const response: Response = await fetchRequest(url, config);
		return response.json();
	} catch (err) {
		if (isHttpError(err)) {
			throw new Error(err.message || 'Something went wrong.');
		}

		throw new Error('Something went wrong.');
	}
}

export async function getTokenResetPasswordAuthApiAction(resetPasswordToken: string): Promise<ResponseGetTokenResetPasswordAuthApiInterface> {
	const url: string = buildUrl(BACKEND_URL, `/reset-password/${resetPasswordToken}`);
	const config: RequestInit = {
		method: 'GET',
	};

	try {
		const response: Response = await fetchRequest(url, config);
		return response.json();
	} catch (err) {
		if (isHttpError(err)) {
			throw new Error(err.message || 'Something went wrong.');
		}

		throw new Error('Something went wrong.');
	}
}

export async function postTokenResetPasswordAuthApiAction(
	resetPasswordToken: string,
	data: RequestPostTokenResetPasswordAuthApiInterface,
): Promise<ResponsePostTokenResetPasswordAuthApiInterface> {
	const url: string = buildUrl(BACKEND_URL, `/reset-password/${resetPasswordToken}`);
	const config: RequestInit = {
		method: 'GET',
		body: JSON.stringify(data),
	};

	try {
		const response: Response = await fetchRequest(url, config);
		return response.json();
	} catch (err) {
		if (isHttpError(err)) {
			throw new Error(err.message || 'Something went wrong.');
		}

		throw new Error('Something went wrong.');
	}
}

export async function postRefreshAuthApiAction(res?: NextResponse): Promise<ResponsePostRefreshAuthApiInterface> {
	try {
		const url: string = buildUrl(BACKEND_URL, '/refresh');
		const refreshToken: string | null = await getCookie(REFRESH_TOKEN_COOKIE);

		const config: RequestInit = {
			method: 'POST',
			...(refreshToken && { headers: { Cookie: `${REFRESH_TOKEN_COOKIE}=${refreshToken}` } }),
			credentials: 'include' as RequestCredentials,
		};

		const response: Response = await fetchRequest(url, config, true, res);
		return response.json();
	} catch (err) {
		if (isHttpError(err)) {
			throw new Error(err.message || 'Something went wrong.');
		}

		throw new Error('Something went wrong.');
	}
}

export async function deleteLogoutAuthApiAction(): Promise<void> {
	try {
		const url: string = buildUrl(BACKEND_URL, '/logout');
		const refreshToken: string | null = await getCookie(REFRESH_TOKEN_COOKIE);

		const config: RequestInit = {
			method: 'DELETE',
			...(refreshToken && { headers: { Cookie: `${REFRESH_TOKEN_COOKIE}=${refreshToken}` } }),
			credentials: 'include' as RequestCredentials,
		};

		await fetchRequest(url, config, true);
	} catch (err) {
		if (isHttpError(err)) {
			throw new Error(err.message || 'Something went wrong.');
		}

		throw new Error('Something went wrong.');
	}
}
