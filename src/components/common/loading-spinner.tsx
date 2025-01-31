import clsx from 'clsx';
import { ReactNode } from 'react';

interface LoadingSpinnerProps {
	size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

function LoadingSpinner({ size = 'lg' }: LoadingSpinnerProps): ReactNode {
	return (
		<div
			className={clsx(
				'block animate-spinner rounded-full',
				size === 'sm'
					? 'h-4 w-4 border-2'
					: size === 'md'
						? 'h-6 w-6 border-3'
						: size === 'lg'
							? 'h-8 w-8 border-3'
							: size === 'xl'
								? 'h-10 w-10 border-4'
								: size === '2xl'
									? 'h-12 w-12 border-4'
									: 'h-14 w-14 border-4',
			)}
		/>
	);
}

export default LoadingSpinner;
