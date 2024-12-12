import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default {
	content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			spacing: {
				10.5: '42px',
			},
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
			},
			borderWidth: {
				3: '3px',
			},
			animation: {
				spinner: 'rotation 0.7s linear infinite, change-color 1s ease-in-out infinite',
			},
			keyframes: {
				'change-color': {
					'0%, 100%': { borderColor: colors.neutral['500'], borderBottomColor: 'transparent' },
					'50%': { borderColor: colors.neutral['300'], borderBottomColor: 'transparent' },
				},
				rotation: {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
			},
		},
	},
	plugins: [],
} satisfies Config;
