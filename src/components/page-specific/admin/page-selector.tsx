'use client';

import NumericalToggle from '@/components/common/numerical-toggle';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

interface PageSelectorProps {
	className?: string;
	currentPage: number;
	totalPages: number;
}

function PageSelector({ className, currentPage, totalPages }: PageSelectorProps): ReactNode {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handlePageChange = (page: number): void => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', page.toString());
		router.push(`/admin?${params.toString()}`);
	};

	return <NumericalToggle className={className} currentValue={currentPage} onValueChange={handlePageChange} totalValues={totalPages} />;
}

export default PageSelector;
