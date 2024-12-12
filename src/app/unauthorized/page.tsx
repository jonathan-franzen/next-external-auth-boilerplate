'use server';

import GoBack from '@/components/go-back';
import { ReactNode } from 'react';

export default async function UnauthorizedPage(): Promise<ReactNode> {
	return (
		<div className='flex h-full flex-col justify-between'>
			<div>
				<h1 className='text-center text-sm font-semibold text-gray-700'>UNAUTHORIZED</h1>
				<div className='mt-2 flex flex-col gap-2 overflow-y-scroll'>
					<p className='text-center'>You are not authorized to view this page.</p>
				</div>
			</div>
			<div className='mt-2 flex justify-center'>
				<GoBack className='w-fit text-xs text-pink-900 hover:text-pink-700'>Go back</GoBack>
			</div>
		</div>
	);
}
