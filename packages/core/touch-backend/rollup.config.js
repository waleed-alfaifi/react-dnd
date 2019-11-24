import path from 'path'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

export default {
	input: path.resolve(__dirname, 'lib/index.js'),
	output: [
		{
			name: 'ReactDnDTouchBackend',
			file: path.resolve(__dirname, 'dist/umd/ReactDnDTouchBackend.js'),
			format: 'umd',
		},
		{
			name: 'ReactDnDTouchBackend',
			file: path.resolve(__dirname, 'dist/umd/ReactDnDTouchBackend.min.js'),
			format: 'umd',
			plugins: [terser()],
		},
	],
	external: ['react', 'react-dom', 'react-dnd'],
	globals: {
		react: 'React',
		'react-dom': 'ReactDOM',
		'react-dnd': 'ReactDnD',
	},
	plugins: [
		resolve(),
		commonjs(),
		babel({
			exclude: 'node_modules/**',
			presets: [
				[
					'@babel/env',
					{
						modules: 'false',
						corejs: '3.0.0',
						targets: {
							browsers: '> 0.25%, not dead',
							node: 8,
							ie: '11',
						},
						useBuiltIns: 'usage',
					},
				],
			],
		}),
	],
}