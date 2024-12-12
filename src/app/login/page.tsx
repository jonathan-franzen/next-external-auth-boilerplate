'use server';

import GhostLink from '@/components/common/ghost-link';
import LoginForm from '@/components/features/login-form';
import { ReactNode } from 'react';

export default async function LoginPage(): Promise<ReactNode> {
	return (
		<>
			<h1 className='text-center text-sm font-semibold text-gray-700'>SIGN INTO YOUR ACCOUNT</h1>
			<LoginForm />
			<h3 className='mt-4 text-center text-xs text-gray-700'>Don&apos;t have an account?</h3>
			<div className='flex justify-center'>
				<GhostLink href='/register'>Sign up</GhostLink>
			</div>
		</>
	);
}
