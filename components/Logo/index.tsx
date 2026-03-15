'use client'

import { memo, useState } from 'react'
import { ClientOnly, Image, Skeleton, useBreakpointValue } from '@chakra-ui/react'
import type { ImageProps } from '@chakra-ui/react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import type { MotionProps } from 'motion/react'
import styles from './styles.module.css'
import { ThemeMode, mobileBreakpointsMap } from 'config/theme'
import { simpleOpacity } from 'config/animations'
import { useColorMode } from 'components/ui/color-mode'

const MotionImage = motion.create(Image) as React.ComponentType<ImageProps & MotionProps>

const Logo = () => {
	const { colorMode } = useColorMode()
	const [isLogoLoaded, setLogoLoaded] = useState(false)
	const isMobile = useBreakpointValue(mobileBreakpointsMap)
	const size = isMobile ? '30px' : '50px'

	return (
		<AnimatePresence>
			<Link href="/" passHref>
				<ClientOnly fallback={<Skeleton boxSize={size} />}>
					<MotionImage
						className={!isMobile ? styles.logo : ''}
						boxSize={size}
						objectFit="cover"
						src={
							colorMode === ThemeMode.Dark
								? './logo-white.png'
								: './logo-black.png'
						}
						alt="Siddharth Abbineni Logo"
						variants={simpleOpacity}
						initial="initial"
						animate={isLogoLoaded ? 'animate' : undefined}
						onLoad={() => setLogoLoaded(true)}
						zIndex={2}
					/>
				</ClientOnly>
			</Link>
		</AnimatePresence>
	)
}

export default memo(Logo)
