module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'svelte3'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'prettier/@typescript-eslint',
	],
	overrides: [
		{
			files: ['**/*.svelte'],
			processor: 'svelte3/svelte3',
		},
	],
	rules: {
		'prettier/prettier': 'error',
		'svelte3/lint-template': 2,
	},
}
