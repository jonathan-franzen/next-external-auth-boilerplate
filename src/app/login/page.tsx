'use server';

import GhostLink from '@/components/common/ghost-link';
import LoginForm from '@/components/features/login-form';
import { ReactNode } from 'react';

function LoginPage(): ReactNode {
	return (
		<>
			<h1 className='text-center text-sm font-semibold text-gray-700'>SIGN INTO YOUR ACCOUNT</h1>
			<LoginForm className='mt-12' />
			<h3 className='mt-4 text-center text-xs text-gray-700'>Don&apos;t have an account?</h3>
			<div className='flex justify-center'>
				<GhostLink href='/register'>Sign up</GhostLink>
			</div>
		</>
	);
}

export default LoginPage;
