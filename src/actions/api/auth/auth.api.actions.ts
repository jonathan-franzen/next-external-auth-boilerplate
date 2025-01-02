'use server';

import { getCookieStore } from '@/actions/cookies/cookies.actions';
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
import { BACKEND_URL } from '@/constants/environment.constants';
import buildUrl from '@/utils/build-url';
import { fetchRequest } from '@/utils/fetch';
import { isHttpError } from 'http-errors';
import { NextResponse } from 'next/server';

export async function postRegisterAuthApiAction(data: RequestPostRegisterAuthApiInterface): Promise<ResponsePostRegisterAuthApiInterface> {
	const url = buildUrl(BACKEND_URL, '/register');
	const config = {
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
	const url = buildUrl(BACKEND_URL, '/resend-verify-email');
	const config = {
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
	const url = buildUrl(BACKEND_URL, `/verify-email/${verifyEmailToken}`);
	const config = {
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
	const url = buildUrl(BACKEND_URL, '/login');
	const config = {
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
	const url = buildUrl(BACKEND_URL, '/reset-password');
	const config = {
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
	const url = buildUrl(BACKEND_URL, `/reset-password/${resetPasswordToken}`);
	const config = {
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
	const url = buildUrl(BACKEND_URL, `/reset-password/${resetPasswordToken}`);
	const config = {
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
		const url = buildUrl(BACKEND_URL, '/refresh');
		const config = {
			method: 'POST',
			headers: { Cookie: await getCookieStore() },
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
		const url = buildUrl(BACKEND_URL, '/logout');
		const config = {
			method: 'DELETE',
			headers: { Cookie: await getCookieStore() },
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
