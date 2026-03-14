'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider } from 'next-themes'
import system from 'config/theme'

export function Provider({ children }: { children: React.ReactNode }) {
	return (
		<ChakraProvider value={system}>
			<ThemeProvider
				attribute="class"
				defaultTheme="dark"
				disableTransitionOnChange
			>
				{children}
			</ThemeProvider>
		</ChakraProvider>
	)
}
