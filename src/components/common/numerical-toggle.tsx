'use client';

import GhostButton from '@/components/common/ghost-button';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface NumericalToggleProps {
	currentValue: number;
	totalValues: number;
	onValueChange: (value: number) => void;
	className?: string;
	renderValue?: (value: number) => ReactNode;
}

function NumericalToggle({ currentValue, totalValues, onValueChange, className, renderValue }: NumericalToggleProps): ReactNode {
	const handleValueChange: (newValue: number) => void = (newValue: number): void => {
		if (newValue >= 1 && newValue <= totalValues) {
			onValueChange(newValue);
		}
	};

	const getDisplayedValues: () => (string | number)[] = (): (number | string)[] => {
		const values: (number | string)[] = [];
		values.push(1);

		if (currentValue > 3) values.push('...');

		for (let i: number = Math.max(2, currentValue - 1); i <= Math.min(totalValues - 1, currentValue + 1); i++) {
			values.push(i);
		}

		if (currentValue < totalValues - 2) values.push('...');

		values.push(totalValues);
		return values;
	};

	const displayedValues: (string | number)[] = getDisplayedValues();

	return (
		<div className={twMerge('flex items-center justify-center gap-1.5', className)}>
			{displayedValues.map(
				(value: string | number, index: number): ReactNode =>
					typeof value === 'number' ? (
						<GhostButton
							key={index}
							type='button'
							onClick={(): void => handleValueChange(value)}
							className={value === currentValue ? 'cursor-default font-bold hover:text-pink-900' : ''}
						>
							{renderValue ? renderValue(value) : value}
						</GhostButton>
					) : (
						<span key={index} className='cursor-default text-xs text-gray-700'>
							{value}
						</span>
					),
			)}
		</div>
	);
}

export default NumericalToggle;
