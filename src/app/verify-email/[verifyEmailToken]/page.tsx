'use server';

import { hasCookie } from '@/actions/cookies/cookies.actions';
import VerifyEmail from '@/components/page-specific/verify-email-token/verify-email';
import { ME_COOKIE } from '@/constants/cookies.constants';
import { ReactNode } from 'react';

interface VerifyEmailTokenPageProps {
	params: Promise<{
		verifyEmailToken?: string;
	}>;
}

async function VerifyEmailTokenPage({ params }: VerifyEmailTokenPageProps): Promise<ReactNode> {
	const { verifyEmailToken } = await params;
	const meDataExists: boolean = await hasCookie(ME_COOKIE);

	if (!verifyEmailToken) {
		return null;
	}

	return <VerifyEmail verifyEmailToken={verifyEmailToken} isAuthenticated={meDataExists} />;
}

export default VerifyEmailTokenPage;
