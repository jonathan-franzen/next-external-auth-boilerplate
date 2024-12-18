'use server';

import GhostLink from '@/components/common/ghost-link';
import RegisterForm from '@/components/features/register-form';
import { ReactNode } from 'react';

export default async function RegisterPage(): Promise<ReactNode> {
	return (
		<>
			<h1 className='text-center text-sm font-semibold text-gray-700'>SIGN UP FOR SERVICE</h1>
			<RegisterForm />
			<h3 className='mt-4 text-center text-xs text-gray-700'>Already have an account?</h3>
			<div className='flex justify-center'>
				<GhostLink href='/login'>Sign in</GhostLink>
			</div>
		</>
	);
}
