'use client';

import GhostButton from '@/components/common/ghost-button';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface NumericalToggleProps {
	className?: string;
	currentValue: number;
	onValueChange: (value: number) => void;
	renderValue?: (value: number) => ReactNode;
	totalValues: number;
}

function NumericalToggle({ className, currentValue, onValueChange, renderValue, totalValues }: NumericalToggleProps): ReactNode {
	const handleValueChange = (newValue: number): void => {
		if (newValue >= 1 && newValue <= totalValues) {
			onValueChange(newValue);
		}
	};

	const getDisplayedValues = (): (number | string)[] => {
		const values: (number | string)[] = [];
		values.push(1);

		if (currentValue > 3) values.push('...');

		for (let i = Math.max(2, currentValue - 1); i <= Math.min(totalValues - 1, currentValue + 1); i++) {
			values.push(i);
		}

		if (currentValue < totalValues - 2) values.push('...');

		values.push(totalValues);
		return values;
	};

	const displayedValues = getDisplayedValues();

	return (
		<div className={twMerge('flex items-center justify-center gap-1.5', className)}>
			{displayedValues.map(
				(value: number | string, index: number): ReactNode =>
					typeof value === 'number' ? (
						<GhostButton
							className={value === currentValue ? 'cursor-default font-bold hover:text-pink-900' : ''}
							key={index}
							onClick={() => handleValueChange(value)}
							type='button'
						>
							{renderValue ? renderValue(value) : value}
						</GhostButton>
					) : (
						<span className='cursor-default text-xs text-gray-700' key={index}>
							{value}
						</span>
					),
			)}
		</div>
	);
}

export default NumericalToggle;
