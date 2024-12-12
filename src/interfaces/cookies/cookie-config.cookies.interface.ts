export default interface CookieConfigCookiesInterface {
	path?: string;
	httpOnly?: boolean;
	secure?: boolean;
	sameSite?: 'strict' | 'lax' | 'none';
	maxAge?: number;
}
