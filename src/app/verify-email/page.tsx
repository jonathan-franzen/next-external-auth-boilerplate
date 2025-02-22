'use server';

import LogoutButton from '@/components/features/logout-button';
import ResendVerifyEmailButton from '@/components/features/resend-verify-email-button';
import { getMeFromAuthSession } from '@/services/iron-session/iron-session.service';
import { ReactNode } from 'react';

async function VerifyEmailPage(): Promise<ReactNode> {
	const me = await getMeFromAuthSession();

	return (
		<>
			<h1 className='text-center text-sm font-semibold text-gray-700'>VERIFY YOUR EMAIL</h1>
			<div className='mt-6'>
				<p className='text-center'>Before you can go any further, you need to verify your email.</p>
			</div>
			<p className='mt-12 text-center text-sm font-semibold text-gray-700'>Have you not received the email?</p>
			<ResendVerifyEmailButton email={me.email} />
			<div className='mt-6 flex justify-center'>
				<LogoutButton />
			</div>
		</>
	);
}

export default VerifyEmailPage;
