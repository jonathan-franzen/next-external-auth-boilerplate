'use client';

import { ChangeEvent, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface DropdownSelectorProps<T> {
	className?: string;
	id?: string;
	initialValue: T;
	label?: string;
	onChange: (value: T) => void;
	options: Array<{ label: string; value: T }>;
}

function DropdownSelector<T>({ className, id = 'dropdown', initialValue, label, onChange, options }: DropdownSelectorProps<T>): ReactNode {
	const handleChange: (e: ChangeEvent<HTMLSelectElement>) => void = (e: ChangeEvent<HTMLSelectElement>): void => {
		const selectedValue = e.target.value as T;
		onChange(selectedValue);
	};

	return (
		<div className={twMerge('flex items-center gap-1', className)}>
			{label && (
				<label className='mr-1 text-xs text-pink-900' htmlFor={id}>
					{label}
				</label>
			)}
			<select className='rounded border p-1 text-xs' defaultValue={initialValue as string} id={id} onChange={handleChange}>
				{options.map(
					({ label, value }: { label: string; value: T }): ReactNode => (
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
