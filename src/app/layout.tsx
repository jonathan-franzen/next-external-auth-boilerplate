import type { Metadata } from 'next';

import '@/app/globals.css';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
	description: 'Boilerplate for Next.js Authentication with external API',
	title: 'Next External Auth Boilerplate',
};

function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>): ReactNode {
	return (
		<html lang='en'>
			<body>
				<main className='row-start-2 flex h-screen flex-col items-center justify-center gap-8'>
					<Toaster position='bottom-center' />
					<div className='flex h-[600px] w-96 flex-col border border-black p-8'>{children}</div>
				</main>
			</body>
		</html>
	);
}

export default RootLayout;
