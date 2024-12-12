'use client';

import LogoutButton from '@/components/logout-button';
import VerifyEmailPropsReactInterface from '@/interfaces/react/props/verify-email.props.react.interface';
import internalApiService from '@/services/internal-api';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

export default function VerifyEmail({ verifyEmailToken, isAuthenticated }: VerifyEmailPropsReactInterface): ReactNode {
	const router: AppRouterInstance = useRouter();
	const [isError, setIsError] = useState(false);

	useEffect((): void => {
		const verify: () => Promise<void> = async (): Promise<void> => {
			try {
				await internalApiService.postVerifyEmail({ verifyEmailToken });
				router.push('/dashboard');
			} catch {
				setIsError(true);
			}
		};

		void verify();
	}, []);

	if (isError) {
		return (
			<>
				<h1 className='text-center text-sm font-semibold text-gray-700'>ERROR VERIFYING EMAIL</h1>
				<div className='mt-4 flex justify-center'>
					{isAuthenticated ? (
						<LogoutButton />
					) : (
						<a href='/login' className='w-fit text-xs text-pink-900 hover:text-pink-700'>
							Back to login
						</a>
					)}
				</div>
			</>
		);
	}

	return null;
}
