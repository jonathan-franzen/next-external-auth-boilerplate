'use client';

import { onClickLogoutButtonFeatureAction } from '@/actions/feature/feature.actions';
import PrimaryButton from '@/components/common/primary-button';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';

function LogoutButton(): ReactNode {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const handleOnClick = async (): Promise<void> => {
		setIsLoading(true);
		try {
			await onClickLogoutButtonFeatureAction();
		} finally {
			router.push('/login');
		}
	};

	return (
		<PrimaryButton className='inline-flex w-full' isLoading={isLoading} onClick={() => void handleOnClick()}>
			SIGN OUT
		</PrimaryButton>
	);
}

export default LogoutButton;
