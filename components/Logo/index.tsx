'use client'

import { memo, useState } from 'react'
import {Image, useBreakpointValue} from '@chakra-ui/react'
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
	return (
		<AnimatePresence>
			<Link href="/" passHref>
				{colorMode === ThemeMode.Dark ? (
					<MotionImage
						className={!isMobile ? styles.logo : ''}
						boxSize={isMobile ? '30px' : '50px'}
						objectFit="cover"
						src="./logo-white.png"
						alt="Siddharth Abbineni Logo"
						variants={simpleOpacity}
						initial="initial"
						animate={isLogoLoaded ? 'animate' : undefined}
						onLoad={() => setLogoLoaded(true)}
						zIndex={2}
					/>
				) : (
					<MotionImage
						className={!isMobile ? styles.logo : ''}
						boxSize={isMobile ? '30px' : '50px'}
						objectFit="cover"
						src="./logo-black.png"
						alt="Siddharth Abbineni Logo"
						variants={simpleOpacity}
						initial="initial"
						animate={isLogoLoaded ? 'animate' : undefined}
						onLoad={() => setLogoLoaded(true)}
						zIndex={2}
					/>
				)}
			</Link>
		</AnimatePresence>
	)
}

export default memo(Logo)
