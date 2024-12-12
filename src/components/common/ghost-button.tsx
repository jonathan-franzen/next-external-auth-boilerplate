import Button from '@/components/common/button';
import ButtonPropsReactInterface from '@/interfaces/react/props/button.props.react.interface';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export default function GhostButton(props: ButtonPropsReactInterface): ReactNode {
	return (
		<Button {...props} className={twMerge('inline-flex h-fit w-fit text-xs text-pink-900 hover:text-pink-700', props.className)}>
			{props.children}
		</Button>
	);
}
