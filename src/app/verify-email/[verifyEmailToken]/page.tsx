'use server';

import VerifyEmail from '@/components/page-specific/verify-email';
import cookieService from '@/services/cookie';
import { Params } from 'next/dist/server/request/params';
import { ReactNode } from 'react';

export default async function VerifyEmailTokenPage(props: { params: Promise<Params> }): Promise<ReactNode> {
	const meDataExists: boolean = await cookieService.hasCookie('meData');
	const params: Params = await props.params;
	const verifyEmailToken: string | undefined = Array.isArray(params.verifyEmailToken) ? params.verifyEmailToken[0] : params.verifyEmailToken;

	if (!verifyEmailToken) {
		return null;
	}

	return <VerifyEmail verifyEmailToken={verifyEmailToken} isAuthenticated={meDataExists} />;
}
