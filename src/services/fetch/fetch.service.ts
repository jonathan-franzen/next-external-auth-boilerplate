import { postRefreshAuthApiAction } from '@/actions/api/auth/auth.api.actions';
import { ResponsePostRefreshAuthApiInterface } from '@/interfaces/api/auth/auth.api.interfaces';
import { setCookies } from '@/services/cookies/cookies.service';
import { getAuthSessionValue, updateAuthSessionAndSave } from '@/services/iron-session/iron-session.service';
import createError, { isHttpError } from 'http-errors';
import { AuthSessionData, IronSession } from 'iron-session';

const defaultHeaders = { 'Content-Type': 'application/json' };

// Refresh access-token against Backend API and then re-attempt the request.
async function refreshTokenAndMakeRequest(
	url: RequestInfo | URL,
	config: RequestInit,
	setCookiesFromResponse?: boolean,
	session?: IronSession<AuthSessionData>,
): Promise<Response> {
	const response: ResponsePostRefreshAuthApiInterface = await postRefreshAuthApiAction(session);
	const { accessToken } = response;

	const authHeaders = { ['Authorization']: `Bearer ${accessToken}` };

	config = {
		...config,
		headers: {
			...config.headers,
			...authHeaders,
		},
	};

	if (!session) {
		await updateAuthSessionAndSave('accessToken', accessToken);
	} else {
		session.accessToken = accessToken;
	}

	return await fetchRequest(url, config, setCookiesFromResponse);
}

// Custom fetch function that allows to set cookies and handles errors.
export async function fetchRequest(
	url: RequestInfo | URL,
	config: RequestInit,
	setCookiesFromResponse: boolean = false,
	session?: IronSession<AuthSessionData>,
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
		const setCookieHeader: string[] | null = response.headers.getSetCookie();

		if (setCookieHeader) {
			const filteredCookies: string[] = [];
			let refreshToken: string | null = null;

			for (const cookie of setCookieHeader) {
				if (cookie.includes('refreshToken')) {
					const match: RegExpMatchArray | null = cookie.match(/refreshToken=([^;]*)/);
					if (match) {
						refreshToken = match[1];
					}
				} else {
					filteredCookies.push(cookie);
				}
			}

			if (refreshToken) {
				if (!session) {
					await updateAuthSessionAndSave('refreshToken', refreshToken);
				} else {
					session.refreshToken = refreshToken;
				}
			}

			// Call setCookies with filtered cookies (without refreshToken)
			await setCookies(filteredCookies);
		}
	}

	if (!response.ok) {
		let errorMessage: string = 'Something went wrong.';

		try {
			const data: { error?: string } = await response.json();
			errorMessage = data.error || errorMessage;
		} catch {
			// If there is no JSON in the error-response, use the status text.
			errorMessage = response.statusText;
		}

		throw createError(response.status, errorMessage);
	}

	return response;
}

// Fetch protected API routes and reattempt when access-token expired.
export async function authenticatedFetchRequest(
	url: RequestInfo | URL,
	config: RequestInit,
	isServerComponent: boolean,
	setCookiesFromResponse: boolean = false,
	session?: IronSession<AuthSessionData>,
): Promise<Response> {
	const accessToken: string | undefined = session?.accessToken || (await getAuthSessionValue('accessToken'));

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
	} catch (err) {
		// If backend API responds that token is invalid, try to refresh and reattempt request.
		if (!isServerComponent && isHttpError(err) && err.status === 401) {
			return await refreshTokenAndMakeRequest(url, config, setCookiesFromResponse, session);
		}
		throw err;
	}
}

// Make request, either fetchRequest or authenticatedFetchRequest, and handle errors.
export async function makeRequest<T>(func: () => Promise<Response>): Promise<T> {
	try {
		const response: Response = await func();

		try {
			return await response.json();
		} catch {
			return null as T;
		}
	} catch (err) {
		if (isHttpError(err)) {
			throw createError(err.status, err.message || 'Something went wrong.');
		} else if (err instanceof Error) {
			// Log error here
			throw new Error('Something went wrong.');
		}
		throw new Error('Something went wrong.');
	}
}
