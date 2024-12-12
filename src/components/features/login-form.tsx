'use client';

import Form from '@/components/common/form';
import LoginRequestAuthApiInterface from '@/interfaces/api/auth/request/login.request.auth.api.interface';
import FormOnSubmitFunctionReactInterface from '@/interfaces/react/functions/form-on-submit.function.react.interface';
import internalApiService from '@/services/internal-api';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';

export default function LoginForm(): ReactNode {
	const [isLoading, setIsLoading] = useState(false);
	const router: AppRouterInstance = useRouter();

	const handleOnSubmit: FormOnSubmitFunctionReactInterface = async (formData: Record<string, string>): Promise<void> => {
		setIsLoading(true);
		try {
			await internalApiService.postLogin(formData as unknown as LoginRequestAuthApiInterface);
			router.push('/dashboard');
		} catch (err) {
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Form
				fields={[
					{ name: 'email', type: 'email', placeholder: 'Email', autoComplete: 'email', required: true },
					{ name: 'password', type: 'password', placeholder: 'Password', autoComplete: 'current-password', required: true },
				]}
				submitLabel='SIGN IN'
				onSubmit={handleOnSubmit}
				isLoading={isLoading}
				additionalContent={
					<div className='mt-1 flex justify-end'>
						<Link href='/reset-password' className='w-fit text-xs text-pink-900 hover:text-pink-700'>
							Forgot your password?
						</Link>
					</div>
				}
			/>
		</>
	);
}
