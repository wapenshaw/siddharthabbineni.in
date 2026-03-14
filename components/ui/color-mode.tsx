'use client'

import { ClientOnly, IconButton, Skeleton } from '@chakra-ui/react'
import { useTheme } from 'next-themes'
import { LuMoon, LuSun } from 'react-icons/lu'

export type ColorMode = 'light' | 'dark'

export function useColorMode() {
	const { resolvedTheme, setTheme } = useTheme()
	const toggleColorMode = () => {
		setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
	}
	return {
		colorMode: (resolvedTheme ?? 'dark') as ColorMode,
		setColorMode: setTheme,
		toggleColorMode,
	}
}

export function useColorModeValue<T>(light: T, dark: T) {
	const { colorMode } = useColorMode()
	return colorMode === 'dark' ? dark : light
}

export function ColorModeIcon() {
	const { colorMode } = useColorMode()
	return colorMode === 'dark' ? <LuSun /> : <LuMoon />
}

export function ColorModeButton() {
	const { toggleColorMode } = useColorMode()
	return (
		<ClientOnly fallback={<Skeleton boxSize="8" />}>
			<IconButton
				onClick={toggleColorMode}
				variant="ghost"
				aria-label="Toggle color mode"
				size="sm"
			>
				<ColorModeIcon />
			</IconButton>
		</ClientOnly>
	)
}
