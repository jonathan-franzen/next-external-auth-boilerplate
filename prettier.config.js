const config = {
	semi: true,
	singleQuote: true,
	jsxSingleQuote: true,
	bracketSpacing: true,
	bracketSameLine: false,
	arrowParens: 'always',
	tabWidth: 2,
	useTabs: true,
	printWidth: 160,
	importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
	importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
	importOrderTypeScriptVersion: '5.0.0',
	importOrderCaseSensitive: false,
	plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
};

export default config;
