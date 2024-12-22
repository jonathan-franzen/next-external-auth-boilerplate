'use client';

import LoadingSpinner from '@/components/common/loading-spinner';
import ButtonPropsReactInterface from '@/interfaces/react/props/button.props.react.interface';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

function Button({ children, type = 'button', isLoading = false, disabled = false, onClick, className }: ButtonPropsReactInterface): ReactNode {
	return (
		<button type={type} disabled={isLoading || disabled} onClick={onClick} className={twMerge('focus:outline-none disabled:cursor-not-allowed', className)}>
			{isLoading ? <LoadingSpinner size='md' /> : children}
		</button>
	);
}

export default Button;
