import { NextRequest, NextResponse } from 'next/server';

export default function nextRequestRedirect(url: string, req: NextRequest): NextResponse {
	return NextResponse.redirect(new URL(url, req.nextUrl));
}
