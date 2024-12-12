export default interface ButtonPropsReactInterface {
	label: string;
	type?: 'button' | 'submit' | 'reset';
	isLoading?: boolean;
	disabled?: boolean;
	onClick?: () => void;
	className?: string;
}
