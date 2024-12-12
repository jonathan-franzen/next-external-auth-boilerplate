'use client';

import { ReactNode } from 'react';

export default function HomeError(): ReactNode {
	return (
		<>
			<h1 className='text-center text-sm font-semibold text-gray-700'>ERROR PAGE</h1>
			<h3 className='mt-12 text-center'>Something unexpected happened.</h3>
		</>
	);
}
