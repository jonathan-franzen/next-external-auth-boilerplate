import MeObjectResponseUsersApiInterface from '@/interfaces/api/users/response/objects/me.object.response.users.api.interface';
import CookieConfigCookiesInterface from '@/interfaces/cookies/cookie-config.cookies.interface';
import { parse } from 'cookie';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

class CookieService {
	private readonly cookieConfig: CookieConfigCookiesInterface = {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		path: '/',
		maxAge: 60 * 60 * 1000,
	};

	async getCookie(name: string): Promise<string | null> {
		const cookieStore: ReadonlyRequestCookies = await cookies();
		const cookieValue: string | undefined = cookieStore.get(name)?.value;

		return cookieValue || null;
	}

	async hasCookie(name: string): Promise<boolean> {
		const cookieStore: ReadonlyRequestCookies = await cookies();
		return cookieStore.has(name);
	}

	async setCookie(name: string, value: string, maxAge?: 'session' | number, path?: string, res?: NextResponse): Promise<void> {
		if (res) {
			res.cookies.set(name, value, {
				...this.cookieConfig,
				path: path || this.cookieConfig.path,
				...(maxAge !== 'session' && maxAge ? { maxAge } : { maxAge: this.cookieConfig.maxAge }),
			});
		} else {
			const cookieStore: ReadonlyRequestCookies = await cookies();

			cookieStore.set(name, value, {
				...this.cookieConfig,
				path: path || this.cookieConfig.path,
				...(maxAge !== 'session' && maxAge ? { maxAge } : { maxAge: this.cookieConfig.maxAge }),
			});
		}
	}

	async deleteCookie(name: string): Promise<void> {
		const cookieStore: ReadonlyRequestCookies = await cookies();

		cookieStore.delete(name);
	}

	async getCookieStore(): Promise<string> {
		const cookieStore: ReadonlyRequestCookies = await cookies();

		return cookieStore.toString();
	}

	async deleteAuthCookies(): Promise<void> {
		const authCookies: string[] = ['accessToken', 'refreshToken', 'meData'];
		await Promise.all(authCookies.map((authCookie: string): Promise<void> => this.deleteCookie(authCookie)));
	}

	async getMeFromCookie(): Promise<MeObjectResponseUsersApiInterface> {
		const meCookie: string | null = await this.getCookie('meData');

		if (!meCookie) {
			return redirect('/login');
		}

		const me: MeObjectResponseUsersApiInterface = JSON.parse(meCookie);

		return {
			id: me.id,
			email: me.email,
			roles: me.roles,
			firstName: me.firstName,
			lastName: me.lastName,
			emailVerifiedAt: me.emailVerifiedAt || null,
		};
	}

	async setCookiesFromHeader(setCookieHeader: string[], res?: NextResponse): Promise<void> {
		setCookieHeader.map(async (cookie: string): Promise<void> => {
			const parsedCookie: Record<string, string | undefined> = parse(cookie);

			const cookieName: string = Object.keys(parsedCookie)[0];
			const cookieValue: string | undefined = parsedCookie[cookieName];

			await this.setCookie(cookieName, cookieValue || '', parsedCookie['Max-Age'] ? parseInt(parsedCookie['Max-Age']) : 'session', parsedCookie['Path'], res);
		});
	}
}

export default CookieService;
