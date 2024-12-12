'use server';

import LoginForm from '@/components/login-form';
import Link from 'next/link';
import { ReactNode } from 'react';

export default async function LoginPage(): Promise<ReactNode> {
	return (
		<>
			<h1 className='text-center text-sm font-semibold text-gray-700'>SIGN INTO YOUR ACCOUNT</h1>
			<LoginForm />
			<h3 className='mt-4 text-center text-xs text-gray-700'>Don&apos;t have an account?</h3>
			<div className='flex justify-center'>
				<Link href='/register' className='w-fit text-xs text-pink-900 hover:text-pink-700'>
					Sign up
				</Link>
			</div>
		</>
	);
}
