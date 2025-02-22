'use server';

import VerifyEmail from '@/components/page-specific/verify-email-token/verify-email';
import { ObjectMeUsersApiInterface } from '@/interfaces/api/users/users.api.interfaces';
import { getAuthSessionValue } from '@/services/iron-session/iron-session.service';
import { ReactNode } from 'react';

interface VerifyEmailTokenPageProps {
	params: Promise<{
		verifyEmailToken?: string;
	}>;
}

async function VerifyEmailTokenPage({ params }: VerifyEmailTokenPageProps): Promise<ReactNode> {
	const { verifyEmailToken } = await params;
	const me: ObjectMeUsersApiInterface | undefined = await getAuthSessionValue('me');

	if (!verifyEmailToken) {
		return;
	}

	return <VerifyEmail isAuthenticated={!!me} verifyEmailToken={verifyEmailToken} />;
}

export default VerifyEmailTokenPage;
