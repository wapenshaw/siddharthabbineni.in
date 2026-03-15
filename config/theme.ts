import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

export const ThemeMode = {
	Light: 'light' as const,
	Dark: 'dark' as const,
}

export const mobileBreakpointsMap = {
	base: true,
	md: true,
	lg: true,
	xl: false,
}

const config = defineConfig({
	globalCss: {
		body: {
			color: 'text.body',
			bg: 'bg.body',
		},
	},
	theme: {
		tokens: {
			fonts: {
				body: { value: "'Sora', sans-serif" },
				heading: { value: "'Sora', sans-serif" },
			},
			colors: {
				brand: {
					950: { value: '#121212' },
				},
			},
		},
		semanticTokens: {
			colors: {
				'bg.body': {
					value: { _light: '#F0EDED', _dark: '#121212' },
				},
				'text.body': {
					value: {
						_light: '{colors.gray.700}',
						_dark: '{colors.whiteAlpha.900}',
					},
				},
				'text.emphasis': {
					value: {
						_light: '{colors.teal.600}',
						_dark: '{colors.orange.200}',
					},
				},
				'text.description': {
					value: {
						_light: '{colors.gray.600}',
						_dark: '{colors.gray.400}',
					},
				},
				'text.accent': {
					value: { _light: '{colors.gray.800}', _dark: '{colors.orange.200}' },
				},
				'text.accentAlt': {
					value: { _light: '{colors.teal.700}', _dark: '#A6A6A6' },
				},
				'link.default': {
					value: {
						_light: '{colors.teal.600}',
						_dark: '{colors.orange.200}',
					},
				},
				'link.description': {
					value: {
						_light: '{colors.gray.700}',
						_dark: '{colors.gray.400}',
					},
				},
				'link.descriptionHover': {
					value: {
						_light: '{colors.teal.600}',
						_dark: '{colors.orange.200}',
					},
				},
				'border.accent': {
					value: {
						_light: '{colors.gray.400}',
						_dark: '{colors.gray.400}',
					},
				},
				'border.button': {
					value: { _light: '{colors.gray.700}', _dark: '{colors.orange.200}' },
				},
				'border.buttonAlt': {
					value: {
						_light: '{colors.gray.400}',
						_dark: '{colors.whiteAlpha.500}',
					},
				},
				'bg.buttonAltHover': {
					value: {
						_light: 'rgba(49, 151, 149, 0.08)',
						_dark: 'rgba(157, 236, 249, 0.06)',
					},
				},
				'border.divider': {
					value: {
						_light: '{colors.gray.400}',
						_dark: '{colors.gray.400}',
					},
				},
			},
		},
	},
})

const system = createSystem(defaultConfig, config)
export default system
