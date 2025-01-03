import { postRefreshAuthApiAction } from '@/actions/api/auth/auth.api.actions';
import { getCookie, setCookie, setCookies } from '@/actions/cookies/cookies.actions';
import { ACCESS_TOKEN_COOKIE } from '@/constants/cookies.constants';
import { ResponsePostRefreshAuthApiInterface } from '@/interfaces/api/auth/auth.api.interfaces';
import createError, { isHttpError } from 'http-errors';
import { NextResponse } from 'next/server';

const defaultHeaders = { 'Content-Type': 'application/json' };

async function refreshTokenAndMakeRequest(url: RequestInfo | URL, config: RequestInit, res?: NextResponse): Promise<Response> {
	const response: ResponsePostRefreshAuthApiInterface = await postRefreshAuthApiAction(res);
	const { accessToken } = response;

	const authHeaders = { ['Authorization']: `Bearer ${accessToken}` };

	config = {
		...config,
		headers: {
			...config.headers,
			...authHeaders,
		},
	};

	await setCookie(ACCESS_TOKEN_COOKIE, accessToken, 60 * 60 * 1000, '/', res);

	return await fetchRequest(url, config);
}

export async function fetchRequest(
	url: RequestInfo | URL,
	config: RequestInit,
	setCookiesFromResponse: boolean = false,
	res?: NextResponse,
): Promise<Response> {
	config = {
		...config,
		headers: {
			...config.headers,
			...defaultHeaders,
		},
	};

	const response: Response = await fetch(url, config);

	if (setCookiesFromResponse) {
		const cookies: string[] | null = response.headers.getSetCookie();
		if (cookies) {
			await setCookies(cookies, res);
		}
	}

	if (!response.ok) {
		let errorMessage: string = 'Something went wrong.';

		try {
			const data: { error?: string } = await response.json();
			errorMessage = data.error || errorMessage;
		} catch {
			errorMessage = response.statusText;
		}

		throw createError(response.status, errorMessage);
	}

	return response;
}

export async function authenticatedFetchRequest(url: RequestInfo | URL, config: RequestInit, res?: NextResponse): Promise<Response> {
	const accessToken: string | null = await getCookie(ACCESS_TOKEN_COOKIE);

	const authenticatedRequestHeaders = { ['Authorization']: `Bearer ${accessToken}` };

	config = {
		...config,
		headers: {
			...config.headers,
			...authenticatedRequestHeaders,
		},
	};

	try {
		return await fetchRequest(url, config);
	} catch (err) {
		if (isHttpError(err) && err.status === 401) {
			return await refreshTokenAndMakeRequest(url, config, res);
		}
		throw err;
	}
}
