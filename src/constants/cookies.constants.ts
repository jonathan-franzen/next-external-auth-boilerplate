export const REFRESH_TOKEN_COOKIE = 'refreshToken';
export const ACCESS_TOKEN_COOKIE = 'accessToken';
export const ME_COOKIE = 'me';

interface DefaultCookieConfigInterface {
	path?: string;
	httpOnly?: boolean;
	secure?: boolean;
	sameSite?: 'strict' | 'lax' | 'none';
	maxAge?: number;
}

export const DEFAULT_COOKIE_CONFIG: DefaultCookieConfigInterface = {
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
	sameSite: 'strict',
	path: '/',
	maxAge: 60 * 60 * 1000,
};
