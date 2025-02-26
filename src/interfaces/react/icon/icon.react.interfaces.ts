import { IconSize } from '@/types/react/icon/icon.react.types';
import { DetailedHTMLProps, HTMLAttributes, SVGProps } from 'react';

export interface IconProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
	fill?: string;
	icon?: string;
	iconAriaHidden?: boolean;
	iconFocusable?: boolean;
	name?: string;
	size?: IconSize;
	svgProps?: SvgSettingsProps;
	testId?: string;
}

export interface SvgSettingsProps extends SVGProps<SVGSVGElement> {
	currentColor?: string;
	pathClassName?: string;
	viewBox?: string;
}
