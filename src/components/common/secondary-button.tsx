import Button from '@/components/common/button';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface SecondaryButtonProps {
	type?: 'button' | 'submit' | 'reset';
	isLoading?: boolean;
	disabled?: boolean;
	onClick?: () => void;
	className?: string;
	children?: ReactNode;
}

function SecondaryButton(props: SecondaryButtonProps): ReactNode {
	return (
		<Button
			{...props}
			className={twMerge(
				'inline-flex min-h-10.5 items-center justify-center gap-2 rounded-md border px-3 text-center text-xs font-semibold text-gray-700 focus:outline-none disabled:cursor-not-allowed data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1',
				props.className,
			)}
		>
			{props.children}
		</Button>
	);
}

export default SecondaryButton;
