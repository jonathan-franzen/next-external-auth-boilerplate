import apiService from '@/services/api';
import cookieService from '@/services/cookie';
import { NextResponse } from 'next/server';

export async function DELETE(): Promise<NextResponse> {
	try {
		await apiService.deleteLogout();

		await cookieService.deleteAuthCookies();

		return NextResponse.json({ message: 'Logout successful.' }, { status: 200 });
	} catch {
		await cookieService.deleteAuthCookies();

		return NextResponse.json({ message: 'Logout successful.' }, { status: 200 });
	}
}
