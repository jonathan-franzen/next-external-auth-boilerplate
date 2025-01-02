'use client';

import { postTokenVerifyEmailAuthApiAction } from '@/actions/api/auth/auth.api.actions';
import GhostLink from '@/components/common/ghost-link';
import LogoutButton from '@/components/features/logout-button';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface VerifyEmailProps {
	verifyEmailToken: string;
	isAuthenticated: boolean;
}

function VerifyEmail({ verifyEmailToken, isAuthenticated }: VerifyEmailProps): ReactNode {
	const router: AppRouterInstance = useRouter();
	const [isError, setIsError] = useState(false);

	useEffect((): void => {
		const verify: () => Promise<void> = async (): Promise<void> => {
			try {
				await postTokenVerifyEmailAuthApiAction(verifyEmailToken);
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

export default VerifyEmail;
