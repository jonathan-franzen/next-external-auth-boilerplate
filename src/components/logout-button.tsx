'use client';

import Button from '@/components/button';
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
		} catch {
		} finally {
			router.push('/login');
			setIsLoading(false);
		}
	};

	return <Button label='SIGN OUT' onClick={handleOnClick} isLoading={isLoading} className='mt-6' />;
}
