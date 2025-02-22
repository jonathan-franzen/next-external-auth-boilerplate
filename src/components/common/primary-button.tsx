import Button from '@/components/common/button';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface PrimaryButtonProps {
	children?: ReactNode;
	className?: string;
	disabled?: boolean;
	isLoading?: boolean;
	onClick?: () => void;
	type?: 'button' | 'reset' | 'submit';
}

function PrimaryButton(props: PrimaryButtonProps): ReactNode {
	return (
		<Button
			{...props}
			className={twMerge(
				'inline-flex min-h-10.5 items-center justify-center gap-2 rounded-md bg-gray-700 px-3 text-center text-xs font-semibold text-white shadow-inner focus:outline-none disabled:cursor-not-allowed data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1',
				props.className,
			)}
		>
			{props.children}
		</Button>
	);
}

export default PrimaryButton;
