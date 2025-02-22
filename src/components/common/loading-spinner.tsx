import clsx from 'clsx';
import { ReactNode } from 'react';

interface LoadingSpinnerProps {
	size?: '2xl' | '3xl' | 'lg' | 'md' | 'sm' | 'xl';
}

function LoadingSpinner({ size = 'lg' }: LoadingSpinnerProps): ReactNode {
	return (
		<div
			className={clsx(
				'block animate-spinner rounded-full',
				size === 'sm'
					? 'size-4 border-2'
					: size === 'md'
						? 'size-6 border-3'
						: size === 'lg'
							? 'size-8 border-3'
							: size === 'xl'
								? 'size-10 border-4'
								: size === '2xl'
									? 'size-12 border-4'
									: 'size-14 border-4',
			)}
		/>
	);
}

export default LoadingSpinner;
