import { DEFAULT_COOKIE_CONFIG } from '@/constants/cookies.constants';
import { parse } from 'cookie';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function getCookie(name: string): Promise<string | null> {
	const cookieStore: ReadonlyRequestCookies = await cookies();
	const cookieValue: string | undefined = cookieStore.get(name)?.value;

	return cookieValue || null;
}

export async function hasCookie(name: string): Promise<boolean> {
	const cookieStore: ReadonlyRequestCookies = await cookies();
	return cookieStore.has(name);
}

export async function setCookie(name: string, value: string, maxAge?: 'session' | number, path?: string, res?: NextResponse): Promise<void> {
	if (res) {
		res.cookies.set(name, value, {
			...DEFAULT_COOKIE_CONFIG,
			path: path || DEFAULT_COOKIE_CONFIG.path,
			...(maxAge !== 'session' && maxAge ? { maxAge } : { maxAge: DEFAULT_COOKIE_CONFIG.maxAge }),
		});
	} else {
		const cookieStore: ReadonlyRequestCookies = await cookies();

		cookieStore.set(name, value, {
			...DEFAULT_COOKIE_CONFIG,
			path: path || DEFAULT_COOKIE_CONFIG.path,
			...(maxAge !== 'session' && maxAge ? { maxAge } : { maxAge: DEFAULT_COOKIE_CONFIG.maxAge }),
		});
	}
}

export async function setCookies(cookies: string[], res?: NextResponse): Promise<void> {
	cookies.map(async (cookie: string): Promise<void> => {
		const parsedCookie: Record<string, string | undefined> = parse(cookie);

		const cookieName: string = Object.keys(parsedCookie)[0];
		const cookieValue: string | undefined = parsedCookie[cookieName];

		await setCookie(cookieName, cookieValue || '', parsedCookie['Max-Age'] ? parseInt(parsedCookie['Max-Age']) : 'session', parsedCookie['Path'], res);
	});
}

export async function deleteCookie(name: string): Promise<void> {
	const cookieStore: ReadonlyRequestCookies = await cookies();

	cookieStore.delete(name);
}
