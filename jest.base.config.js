module.exports = {
	preset: 'ts-jest',
	transform: {
		'^.+\\.svelte$': 'jest-transform-svelte',
	},
	moduleFileExtensions: ['ts', 'js', 'svelte'],
	collectCoverageFrom: ['src/**/*.ts'],
	globals: {
		'ts-jest': {
			packageJson: 'package.json',
		},
	},
}
