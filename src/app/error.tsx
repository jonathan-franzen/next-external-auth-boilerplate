'use client';

import GhostButton from '@/components/common/ghost-button';
import GoBack from '@/components/common/go-back';
import { ReactNode } from 'react';

export default function HomeError(): ReactNode {
	return (
		<div className='flex h-full flex-col justify-between'>
			<div>
				<h1 className='text-center text-sm font-semibold text-gray-700'>ERROR PAGE</h1>
				<div className='mt-2 flex flex-col gap-2 overflow-y-scroll'>
					<p className='text-center'>Something unexpected happened...</p>
				</div>
			</div>
			<div className='mt-2 flex justify-center'>
				<GoBack>
					<GhostButton>Go back</GhostButton>
				</GoBack>
			</div>
		</div>
	);
}
