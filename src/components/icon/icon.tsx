import { svgIconComponents } from '@/components/icon/svg-components';
import { IconProps, SvgSettingsProps } from '@/interfaces/react/icon/icon.react.interfaces';
import { IconSize } from '@/types/react/icon/icon.react.types';
import clsx from 'clsx';
import { ReactElement, ReactNode } from 'react';

const resolveSvgByType = (type: string): ((props: SvgSettingsProps) => ReactElement) | undefined => {
	const typeObject = Object.entries(svgIconComponents).find(([key]) => key === type.toLowerCase());

	if (!typeObject) {
		return;
	}

	return typeObject[1];
};

const Icon = (props: IconProps): ReactNode => {
	const { className, icon, name, size = '24', testId } = props;

	const iconName = (): string => {
		if (name) {
			return name;
		}

		if (icon) {
			return icon;
		}

		return '';
	};

	const SvgIcon = resolveSvgByType(iconName());
	return (
		<i className={clsx(className && className, `size-fit leading-[0]`)} data-testid={testId} role={props.role} title={props.title}>
			{SvgIcon ? <SvgIcon aria-hidden={true} fill={props.fill} focusable={false} height={size} width={size} {...props.svgProps} /> : ''}
		</i>
	);
};

Icon.defaultProps = {
	role: 'img',
	size: '24' as IconSize,
};

export default Icon;
