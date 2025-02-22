export const REFRESH_TOKEN_COOKIE_NAME = 'refreshToken';
export const AUTH_SESSION_COOKIE_NAME = 'session';

export const DEFAULT_COOKIE_CONFIG = {
	httpOnly: true,
	maxAge: 60 * 60 * 1000,
	path: '/',
	sameSite: 'strict' as 'lax' | 'none' | 'strict',
	secure: process.env.NODE_ENV === 'production',
};
