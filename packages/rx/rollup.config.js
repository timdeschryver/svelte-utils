import typescript from '@rollup/plugin-typescript'
import pkg from './package.json'

export default {
	input: 'src/index.ts',
	output: [
		{
			name: pkg.name,
			file: pkg.main,
			format: 'cjs',
			sourcemap: true,
		},
		{
			name: pkg.name,
			file: pkg.module,
			format: 'es',
			sourcemap: true,
		},
	],
	plugins: [typescript()],
}
