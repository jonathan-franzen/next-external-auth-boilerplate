import { UrlObject } from 'node:url';
import ReactChildrenReactInterface from '@/interfaces/react/react-children.react.interface';

export default interface GhostLinkPropsReactInterface extends ReactChildrenReactInterface {
	href: string | UrlObject;
}
