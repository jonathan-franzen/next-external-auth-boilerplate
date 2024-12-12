'use server';

import RegisterForm from '@/components/register-form';
import Link from 'next/link';
import { ReactNode } from 'react';

export default async function RegisterPage(): Promise<ReactNode> {
	return (
		<>
			<h1 className='text-center text-sm font-semibold text-gray-700'>SIGN UP FOR SERVICE</h1>
			<RegisterForm />
			<h3 className='mt-4 text-center text-xs text-gray-700'>Already have an account?</h3>
			<div className='flex justify-center'>
				<Link href='/login' className='w-fit text-xs text-pink-900 hover:text-pink-700'>
					Sign in
				</Link>
			</div>
		</>
	);
}
