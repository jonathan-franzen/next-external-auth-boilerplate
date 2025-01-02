import { setCookie } from '@/actions/cookies/cookies.actions';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { name, value, maxAge, path } = body;

		if (!name || !value) {
			return NextResponse.json({ error: 'Cookie name and value are required.' }, { status: 400 });
		}

		const response = NextResponse.json({ message: 'Cookie set successfully' });

		await setCookie(name, value, maxAge, path, response);

		return response;
	} catch (error) {
		return NextResponse.json({ error: 'An error occurred while setting the cookie.' }, { status: 500 });
	}
}
