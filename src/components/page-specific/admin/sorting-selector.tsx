'use client';

import DropdownSelector from '@/components/common/dropdown-selector';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

const sortingOptions: { value: string; label: string }[] = [
	{ value: 'firstName', label: 'First Name' },
	{ value: 'lastName', label: 'Last Name' },
	{ value: 'createdAt', label: 'Created At' },
];

interface SortingSelectorProps {
	initialSortingOption: string;
	className?: string;
}

function SortingSelector({ initialSortingOption, className }: SortingSelectorProps): ReactNode {
	const router: AppRouterInstance = useRouter();
	const searchParams: ReadonlyURLSearchParams = useSearchParams();

	const handleOnChange: (newSortBy: string) => void = (newSortBy: string): void => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('sortBy', newSortBy);
		if (params.has('page')) {
			params.set('page', '1');
		}
		router.push(`/admin?${params.toString()}`);
	};

	return (
		<DropdownSelector<string>
			options={sortingOptions}
			initialValue={initialSortingOption}
			onChange={handleOnChange}
			id='sort'
			label='Sort by:'
			className={className}
		/>
	);
}

export default SortingSelector;
