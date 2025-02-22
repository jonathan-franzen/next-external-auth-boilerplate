'use server';

import GhostLink from '@/components/common/ghost-link';
import RegisterForm from '@/components/features/register-form';
import { ReactNode } from 'react';

function RegisterPage(): ReactNode {
	return (
		<>
			<h1 className='text-center text-sm font-semibold text-gray-700'>SIGN UP</h1>
			<RegisterForm className='mt-12' />
			<h3 className='mt-4 text-center text-xs text-gray-700'>Already have an account?</h3>
			<div className='flex justify-center'>
				<GhostLink href='/login'>Sign in</GhostLink>
			</div>
		</>
	);
}

export default RegisterPage;
