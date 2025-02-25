import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import perfectionist from 'eslint-plugin-perfectionist';
import pluginReact from 'eslint-plugin-react';
import pluginSecurity from 'eslint-plugin-security';
import tailwind from 'eslint-plugin-tailwindcss';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
});

const config = [
	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
	{
		languageOptions: {
			globals: globals.browser,
			parser: tseslint,
			parserOptions: {
				project: './tsconfig.json',
				tsconfigRootDir: process.cwd(),
				sourceType: 'module',
			},
		},
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	perfectionist.configs['recommended-natural'],
	pluginReact.configs.flat.recommended,
	eslintPluginUnicorn.configs['flat/recommended'],
	pluginSecurity.configs.recommended,
	...tailwind.configs['flat/recommended'],
	...compat.config({
		extends: ['next'],
		settings: {
			next: {
				rootDir: '.',
			},
		},
	}),
	{
		rules: {
			'@typescript-eslint/explicit-function-return-type': ['error'],
			'@typescript-eslint/no-unnecessary-type-assertion': 'error',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					ignoreRestSiblings: true,
					varsIgnorePattern: '^_',
				},
			],
			'unicorn/no-nested-ternary': 'off',
			'unicorn/prefer-string-raw': 'off',
			'unicorn/prevent-abbreviations': 'off',
		},
	},
	{
		ignores: [
			'**/temp.js',
			'config/*',
			'node_modules/',
			'.serverless/',
			'dist/',
			'build/',
			'.eslintcache',
			'npm-debug.log*',
			'yarn-debug.log*',
			'yarn-error.log*',
			'.env',
			'.env.local',
			'.env.development',
			'.env.test',
			'.env.production',
			'.vscode/',
			'.idea/',
			'*.iml',
			'.DS_Store',
			'coverage/',
			'tmp/',
			'temp/',
			'.next/**',
			'public/**',
			'next.config.js',
			'postcss.config.js',
		],
	},
];

export default config;
