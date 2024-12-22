'use server';

import GhostButton from '@/components/common/ghost-button';
import GoBack from '@/components/common/go-back';
import { ReactNode } from 'react';

async function UnauthorizedPage(): Promise<ReactNode> {
	return (
		<div className='flex h-full flex-col justify-between'>
			<div>
				<h1 className='text-center text-sm font-semibold text-gray-700'>UNAUTHORIZED</h1>
				<div className='mt-2 flex flex-col gap-2 overflow-y-scroll'>
					<p className='text-center'>You are not authorized to view this page.</p>
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

export default UnauthorizedPage;
