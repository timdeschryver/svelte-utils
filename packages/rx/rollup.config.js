import sucrase from 'rollup-plugin-sucrase'
import pkg from './package.json'

export default {
	input: 'src/index.ts',
	output: [
		{
			name: pkg.name,
			file: `./dist/${pkg.main}`,
			format: 'cjs',
			sourcemap: true,
		},
		{
			name: pkg.name,
			file: `./dist/${pkg.module}`,
			format: 'es',
			sourcemap: true,
		},
	],
	plugins: [
		sucrase({
			transforms: ['typescript'],
		}),
	],
}
