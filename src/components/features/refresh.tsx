'use client';

import LoadingSpinner from '@/components/common/loading-spinner';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { ReactNode, startTransition, useEffect, useState } from 'react';

interface RefreshProps {
	loadingIndicator?: boolean;
}

function Refresh({ loadingIndicator = false }: RefreshProps): ReactNode {
	const router: AppRouterInstance = useRouter();
	const [isLoading, setIsLoading] = useState(true);

	useEffect((): void => {
		const refresh: () => Promise<void> = async (): Promise<void> => {
			router.refresh();
			startTransition((): void => {
				setIsLoading(false);
			});
		};

		void refresh();
	}, [router]);

	return !isLoading || !loadingIndicator ? null : (
		<div className='flex w-full justify-center'>
			<LoadingSpinner />
		</div>
	);
}

export default Refresh;
