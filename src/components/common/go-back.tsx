'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface GoBackProps {
	children?: ReactNode;
}

function GoBack({ children }: GoBackProps): ReactNode {
	const router = useRouter();
	return (
		<div className='inline-flex' onClick={() => router.back()}>
			{children}
		</div>
	);
}

export default GoBack;
