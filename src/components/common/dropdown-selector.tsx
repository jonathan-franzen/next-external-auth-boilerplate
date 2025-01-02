'use client';

import { ChangeEvent, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface DropdownSelectorProps<T> {
	options: Array<{ value: T; label: string }>;
	initialValue: T;
	onChange: (value: T) => void;
	className?: string;
	label?: string;
	id?: string;
}

function DropdownSelector<T>({ options, initialValue, onChange, className, label, id = 'dropdown' }: DropdownSelectorProps<T>): ReactNode {
	const handleChange: (e: ChangeEvent<HTMLSelectElement>) => void = (e: ChangeEvent<HTMLSelectElement>): void => {
		const selectedValue = e.target.value as T;
		onChange(selectedValue);
	};

	return (
		<div className={twMerge('flex items-center gap-1', className)}>
			{label && (
				<label htmlFor={id} className='mr-1 text-xs text-pink-900'>
					{label}
				</label>
			)}
			<select id={id} defaultValue={initialValue as string} onChange={handleChange} className='rounded border p-1 text-xs'>
				{options.map(
					({ value, label }: { value: T; label: string }): ReactNode => (
						<option key={String(value)} value={String(value)}>
							{label}
						</option>
					),
				)}
			</select>
		</div>
	);
}

export default DropdownSelector;
