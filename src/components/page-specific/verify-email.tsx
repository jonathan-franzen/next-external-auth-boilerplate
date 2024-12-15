'use client';

import GhostLink from '@/components/common/ghost-link';
import LogoutButton from '@/components/features/logout-button';
import VerifyEmailPropsReactInterface from '@/interfaces/react/props/verify-email.props.react.interface';
import internalApiService from '@/services/internal-api';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function VerifyEmail({ verifyEmailToken, isAuthenticated }: VerifyEmailPropsReactInterface): ReactNode {
	const router: AppRouterInstance = useRouter();
	const [isError, setIsError] = useState(false);

	useEffect((): void => {
		const verify: () => Promise<void> = async (): Promise<void> => {
			try {
				await internalApiService.postVerifyEmail({ verifyEmailToken });
				toast.success('Email verified.');
				router.push('/dashboard');
			} catch {
				setIsError(true);
			}
		};

		void verify();
	}, [router, verifyEmailToken]);

	if (isError) {
		return (
			<>
				<h1 className='text-center text-sm font-semibold text-gray-700'>ERROR VERIFYING EMAIL</h1>
				<div className='mt-10 flex justify-center'>{isAuthenticated ? <LogoutButton /> : <GhostLink href='/login'>Back to login</GhostLink>}</div>
			</>
		);
	}

	return null;
}
