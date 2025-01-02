import Button from '@/components/common/button';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface GhostButtonProps {
	type?: 'button' | 'submit' | 'reset';
	isLoading?: boolean;
	disabled?: boolean;
	onClick?: () => void;
	className?: string;
	children?: ReactNode;
}

function GhostButton(props: GhostButtonProps): ReactNode {
	return (
		<Button {...props} className={twMerge('inline-flex h-fit w-fit text-xs text-pink-900 hover:text-pink-700', props.className)}>
			{props.children}
		</Button>
	);
}

export default GhostButton;
