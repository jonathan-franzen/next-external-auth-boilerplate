import { AUTH_SESSION_COOKIE_NAME } from '@/constants/cookies.constants';
import { IRON_SESSION_SECRET } from '@/constants/environment.constants';
import { ObjectMeUsersApiInterface } from '@/interfaces/api/users/users.api.interfaces';
import { AuthSessionData, getIronSession, IronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export const sessionOptions = {
	cookieName: AUTH_SESSION_COOKIE_NAME,
	cookieOptions: {
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 30,
		path: '/',
		secure: process.env.NODE_ENV === 'production',
	},
	password: IRON_SESSION_SECRET,
};

declare module 'iron-session' {
	interface AuthSessionData {
		accessToken?: string;
		me?: ObjectMeUsersApiInterface;
		refreshToken?: string;
	}
}

export async function destroyAuthSession(): Promise<void> {
	const session = await getAuthSession();
	session.destroy();
}

export async function getAuthSession(req?: NextRequest, res?: NextResponse): Promise<IronSession<AuthSessionData>> {
	if (!req || !res) {
		const cookieStore = await cookies();
		return await getIronSession<AuthSessionData>(cookieStore, sessionOptions);
	} else {
		return await getIronSession<AuthSessionData>(req, res, sessionOptions);
	}
}

export async function getAuthSessionValue<K extends keyof AuthSessionData>(key: K, req?: NextRequest, res?: NextResponse): Promise<AuthSessionData[K]> {
	const session = await getAuthSession(req, res);
	return Object.entries(session)
		.find(([sessionKey]) => sessionKey === key)
		?.at(1) as AuthSessionData[K];
}

export async function getMeFromAuthSession(): Promise<ObjectMeUsersApiInterface> {
	const session = await getAuthSession();

	if (!session.me) {
		return redirect('/login');
	}

	return session.me;
}

export async function updateAuthSessionAndSave<K extends keyof AuthSessionData>(key: K, value: AuthSessionData[K]): Promise<void> {
	const session = await getAuthSession();

	Object.assign(session, { [key]: value });

	await session.save();
}
