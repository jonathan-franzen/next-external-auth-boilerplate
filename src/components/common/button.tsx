'use client';

import LoadingSpinner from '@/components/common/loading-spinner';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
	type?: 'button' | 'submit' | 'reset';
	isLoading?: boolean;
	disabled?: boolean;
	onClick?: () => void;
	className?: string;
	children?: ReactNode;
}

function Button({ type = 'button', isLoading = false, disabled = false, onClick, className, children }: ButtonProps): ReactNode {
	return (
		<button type={type} disabled={isLoading || disabled} onClick={onClick} className={twMerge('focus:outline-none disabled:cursor-not-allowed', className)}>
			{isLoading ? <LoadingSpinner size='md' /> : children}
		</button>
	);
}

export default Button;
