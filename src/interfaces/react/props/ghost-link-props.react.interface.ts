import { UrlObject } from 'node:url';
import ReactChildrenReactInterface from '@/interfaces/react/react-children.react.interface';

interface GhostLinkPropsReactInterface extends ReactChildrenReactInterface {
	href: string | UrlObject;
}

export default GhostLinkPropsReactInterface;
