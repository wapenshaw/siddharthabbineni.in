import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

const eslintConfig = [
	...compat.extends('next/core-web-vitals'),
	{
		rules: {
			'arrow-body-style': ['error', 'as-needed'],
			'array-callback-return': 'error',
			curly: ['error', 'all'],
			'prefer-template': 'error',
			'no-trailing-spaces': 'error',
		},
	},
]

export default eslintConfig
