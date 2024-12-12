import Button from '@/components/common/button';
import ButtonPropsReactInterface from '@/interfaces/react/props/button.props.react.interface';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export default function PrimaryButton(props: ButtonPropsReactInterface): ReactNode {
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
