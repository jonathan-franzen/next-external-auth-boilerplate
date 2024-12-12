'use server';

import GhostLink from '@/components/common/ghost-link';
import SendResetPasswordEmailForm from '@/components/features/send-reset-password-email-form';
import { ReactNode } from 'react';

export default async function ResetPasswordPage(): Promise<ReactNode> {
	return (
		<>
			<h1 className='text-center text-sm font-semibold text-gray-700'>RESET YOUR PASSWORD</h1>
			<SendResetPasswordEmailForm />
			<div className='mt-4 flex justify-center'>
				<GhostLink href='/login'>Back to login</GhostLink>
			</div>
		</>
	);
}
