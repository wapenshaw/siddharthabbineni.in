'use client'

import { useEffect, useState } from 'react'
import { ClientOnly, IconButton, Skeleton } from '@chakra-ui/react'
import { useTheme } from 'next-themes'
import { LuMoon, LuSun } from 'react-icons/lu'

export type ColorMode = 'light' | 'dark'

/**
 * SSR-safe color mode hook. Returns 'dark' on the server and during
 * hydration so the first client render always matches the server.
 * After mount, it reflects the real resolved theme from next-themes.
 */
export function useColorMode() {
	const { resolvedTheme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const toggleColorMode = () => {
		setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
	}

	return {
		colorMode: (mounted ? resolvedTheme ?? 'dark' : 'dark') as ColorMode,
		setColorMode: setTheme,
		toggleColorMode,
		mounted,
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
