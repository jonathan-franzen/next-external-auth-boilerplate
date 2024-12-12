'use client';

import ReactChildrenReactInterface from '@/interfaces/react/react-children.react.interface';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export default function GoBack({ children }: ReactChildrenReactInterface): ReactNode {
	const router: AppRouterInstance = useRouter();
	return (
		<div className='inline-flex' onClick={(): void => router.back()}>
			{children}
		</div>
	);
}
