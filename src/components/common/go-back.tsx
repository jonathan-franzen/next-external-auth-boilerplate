'use client';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface GoBackProps {
	children?: ReactNode;
}

function GoBack({ children }: GoBackProps): ReactNode {
	const router: AppRouterInstance = useRouter();
	return (
		<div className='inline-flex' onClick={(): void => router.back()}>
			{children}
		</div>
	);
}

export default GoBack;
