'use client';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, ReactNode } from 'react';

export default function GoBack({
	className,
	children,
}: PropsWithChildren<{
	className?: string;
}>): ReactNode {
	const router: AppRouterInstance = useRouter();
	return (
		<button className={className} onClick={(): void => router.back()}>
			{children}
		</button>
	);
}
