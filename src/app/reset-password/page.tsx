'use server';

import SendResetPasswordEmailForm from '@/components/send-reset-password-email-form';
import Link from 'next/link';
import { ReactNode } from 'react';

export default async function ResetPasswordPage(): Promise<ReactNode> {
	return (
		<>
			<h1 className='text-center text-sm font-semibold text-gray-700'>RESET YOUR PASSWORD</h1>
			<SendResetPasswordEmailForm />
			<div className='mt-4 flex justify-center'>
				<Link href='/login' className='w-fit text-xs text-pink-900 hover:text-pink-700'>
					Go back
				</Link>
			</div>
		</>
	);
}
