import GhostButton from '@/components/common/ghost-button';
import Link from 'next/link';
import { UrlObject } from 'node:url';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface GhostLinkPropsReactInterface {
	children: ReactNode;
	className?: string;
	href: string | UrlObject;
}

function GhostLink({ children, className, href }: GhostLinkPropsReactInterface): ReactNode {
	return (
		<Link className={twMerge('inline-flex', className)} href={href}>
			<GhostButton>{children}</GhostButton>
		</Link>
	);
}

export default GhostLink;
