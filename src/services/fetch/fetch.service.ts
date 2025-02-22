import { postRefreshAuthApiAction } from '@/actions/api/auth/auth.api.actions';
import { setCookies } from '@/services/cookies/cookies.service';
import { getAuthSessionValue, updateAuthSessionAndSave } from '@/services/iron-session/iron-session.service';
import createError, { isHttpError } from 'http-errors';
import { AuthSessionData, IronSession } from 'iron-session';

const defaultHeaders = { 'Content-Type': 'application/json' };

// Fetch protected API routes and reattempt when access-token expired.
export async function authenticatedFetchRequest(
	url: RequestInfo | URL,
	config: RequestInit,
	isServerComponent: boolean,
	setCookiesFromResponse = false,
	session?: IronSession<AuthSessionData>,
): Promise<Response> {
	const accessToken = session?.accessToken || (await getAuthSessionValue('accessToken'));

	const authenticatedRequestHeaders = { ['Authorization']: `Bearer ${accessToken}` };

	config = {
		...config,
		headers: {
			...config.headers,
			...authenticatedRequestHeaders,
		},
	};

	try {
		return await fetchRequest(url, config, setCookiesFromResponse);
	} catch (error) {
		// If backend API responds that token is invalid, try to refresh and reattempt request.
		if (!isServerComponent && isHttpError(error) && error.status === 401) {
			return await refreshTokenAndMakeRequest(url, config, setCookiesFromResponse, session);
		}
		throw error;
	}
}

// Custom fetch function that allows to set cookies and handles errors.
export async function fetchRequest<T extends { error?: string }>(
	url: RequestInfo | URL,
	config: RequestInit,
	setCookiesFromResponse = false,
	session?: IronSession<AuthSessionData>,
): Promise<Response> {
	config = {
		...config,
		headers: {
			...config.headers,
			...defaultHeaders,
		},
	};

	const response = await fetch(url, config);

	if (setCookiesFromResponse) {
		const setCookieHeader = response.headers.getSetCookie();

		if (setCookieHeader) {
			const filteredCookies = [];
			let refreshToken = undefined;

			for (const cookie of setCookieHeader) {
				if (cookie.includes('refreshToken')) {
					const match = cookie.match(/refreshToken=([^;]*)/);
					if (match) {
						refreshToken = match[1];
					}
				} else {
					filteredCookies.push(cookie);
				}
			}

			if (refreshToken) {
				if (session) {
					session.refreshToken = refreshToken;
				} else {
					await updateAuthSessionAndSave('refreshToken', refreshToken);
				}
			}

			// Call setCookies with filtered cookies (without refreshToken)
			setCookies(filteredCookies);
		}
	}

	if (!response.ok) {
		let errorMessage = 'Something went wrong.';

		try {
			const data = (await response.json()) as T;
			errorMessage = data.error || errorMessage;
		} catch {
			// If there is no JSON in the error-response, use the status text.
			errorMessage = response.statusText;
		}

		throw createError(response.status, errorMessage);
	}

	return response;
}

// Make request, either fetchRequest or authenticatedFetchRequest, and handle errors.
export async function makeRequest<T>(func: () => Promise<Response>): Promise<T> {
	try {
		const response = await func();

		try {
			return (await response.json()) as T;
		} catch {
			return undefined as T;
		}
	} catch (error) {
		if (isHttpError(error)) {
			throw createError(error.status, error.message || 'Something went wrong.');
		}

		throw new Error('Something went wrong.');
	}
}

// Refresh access-token against Backend API and then re-attempt the request.
async function refreshTokenAndMakeRequest(
	url: RequestInfo | URL,
	config: RequestInit,
	setCookiesFromResponse?: boolean,
	session?: IronSession<AuthSessionData>,
): Promise<Response> {
	const response = await postRefreshAuthApiAction(session);
	const { accessToken } = response;

	const authHeaders = { ['Authorization']: `Bearer ${accessToken}` };

	config = {
		...config,
		headers: {
			...config.headers,
			...authHeaders,
		},
	};

	if (session) {
		session.accessToken = accessToken;
	} else {
		await updateAuthSessionAndSave('accessToken', accessToken);
	}

	return await fetchRequest(url, config, setCookiesFromResponse);
}
