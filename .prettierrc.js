module.exports = {
	semi: false,
	trailingComma: 'all',
	singleQuote: true,
	tabWidth: 2,
	useTabs: true,
	overrides: [
		{
			files: '*.svelte',
			plugins: ['prettier-plugin-svelte'],
		},
	],
}
