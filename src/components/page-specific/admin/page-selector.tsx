'use client';

import NumericalToggle from '@/components/common/numerical-toggle';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

interface PageSelectorProps {
	currentPage: number;
	totalPages: number;
	className?: string;
}

function PageSelector({ currentPage, totalPages, className }: PageSelectorProps): ReactNode {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handlePageChange: (page: number) => void = (page: number): void => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', page.toString());
		router.push(`/admin?${params.toString()}`);
	};

	return <NumericalToggle currentValue={currentPage} totalValues={totalPages} onValueChange={handlePageChange} className={className} />;
}

export default PageSelector;
