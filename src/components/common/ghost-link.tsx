import { UrlObject } from 'node:url';
import GhostButton from '@/components/common/ghost-button';
import Link from 'next/link';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface GhostLinkPropsReactInterface {
	href: string | UrlObject;
	className?: string;
	children: ReactNode;
}

function GhostLink({ children, href, className }: GhostLinkPropsReactInterface): ReactNode {
	return (
		<Link href={href} className={twMerge('inline-flex', className)}>
			<GhostButton>{children}</GhostButton>
		</Link>
	);
}

export default GhostLink;
