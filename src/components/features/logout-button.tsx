'use client';

import PrimaryButton from '@/components/common/primary-button';
import internalApiService from '@/services/internal-api';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';

export default function LogoutButton(): ReactNode {
	const router: AppRouterInstance = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const handleOnClick: () => Promise<void> = async (): Promise<void> => {
		setIsLoading(true);
		try {
			await internalApiService.deleteLogout();
		} finally {
			router.push('/login');
		}
	};

	return (
		<PrimaryButton onClick={handleOnClick} isLoading={isLoading} className='inline-flex w-full'>
			SIGN OUT
		</PrimaryButton>
	);
}
