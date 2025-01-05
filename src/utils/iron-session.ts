import { IRON_SESSION_SECRET } from '@/constants/environment.constants';
import { ObjectMeUsersApiInterface } from '@/interfaces/api/users/users.api.interfaces';
import { AuthSessionData, getIronSession, IronSession, SessionOptions } from 'iron-session';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export const sessionOptions: SessionOptions = {
	password: IRON_SESSION_SECRET,
	cookieName: 'session',
	cookieOptions: {
		secure: process.env.NODE_ENV === 'production',
		httpOnly: true,
		path: '/',
		maxAge: 60 * 60 * 24 * 30,
	},
};

declare module 'iron-session' {
	interface AuthSessionData {
		refreshToken?: string;
		accessToken?: string;
		me?: ObjectMeUsersApiInterface;
	}
}

export async function getAuthSession(req?: NextRequest, res?: NextResponse): Promise<IronSession<AuthSessionData>> {
	if (!req || !res) {
		const cookieStore: ReadonlyRequestCookies = await cookies();
		return await getIronSession<AuthSessionData>(cookieStore, sessionOptions);
	} else {
		return await getIronSession<AuthSessionData>(req, res, sessionOptions);
	}
}

export async function getAuthSessionValue<K extends keyof AuthSessionData>(key: K, req?: NextRequest, res?: NextResponse): Promise<AuthSessionData[K]> {
	const session: IronSession<AuthSessionData> = await getAuthSession(req, res);
	return session[key];
}

export async function updateAuthSession<K extends keyof AuthSessionData>(key: K, value: AuthSessionData[K]): Promise<void> {
	const session: IronSession<AuthSessionData> & Partial<AuthSessionData> = await getAuthSession();
	(session as AuthSessionData)[key] = value;
	await session.save();
}

export async function getMeFromAuthSession(): Promise<ObjectMeUsersApiInterface> {
	const session: IronSession<AuthSessionData> = await getAuthSession();

	if (!session.me) {
		return redirect('/login');
	}

	return session.me;
}

export async function destroyAuthSession(): Promise<void> {
	const session: IronSession<AuthSessionData> = await getAuthSession();
	session.destroy();
}
