import GhostButton from '@/components/common/ghost-button';
import GhostLinkPropsReactInterface from '@/interfaces/react/props/ghost-link-props.react.interface';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function GhostLink(props: GhostLinkPropsReactInterface): ReactNode {
	return (
		<Link href={props.href} className='inline-flex'>
			<GhostButton>{props.children}</GhostButton>
		</Link>
	);
}
