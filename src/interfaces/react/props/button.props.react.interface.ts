import ReactChildrenReactInterface from '@/interfaces/react/react-children.react.interface';

interface ButtonPropsReactInterface extends ReactChildrenReactInterface {
	type?: 'button' | 'submit' | 'reset';
	isLoading?: boolean;
	disabled?: boolean;
	onClick?: () => void;
	className?: string;
}

export default ButtonPropsReactInterface;
