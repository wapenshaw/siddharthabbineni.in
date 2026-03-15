'use client'

import { Box, Icon, useBreakpointValue } from '@chakra-ui/react'
import { RiArrowDownLine } from 'react-icons/ri'
import { motion, Variants, AnimatePresence } from 'motion/react'
import useScrollDirection, { ScrollDirection } from 'hooks/useScrollDirection'
import { mobileBreakpointsMap } from 'config/theme'

const scrollMoreVariants: Variants = {
	initial: {
		opacity: 0,
		y: 50,
	},
	hidden: {
		opacity: [0, 1],
		transition: {
			duration: 0.5,
			delay: 1,
			ease: 'easeIn',
		},
	},
	bounce: {
		y: [0, -14, 0],
		transition: {
			duration: 1.6,
			ease: 'easeOut',
			repeatType: 'loop',
			repeat: Infinity,
		},
	},
}

const ScrollMore = () => {
	const isMobile = useBreakpointValue(mobileBreakpointsMap)
	const scrollDirection = useScrollDirection(false, isMobile)

	return (
		<Box
			position="fixed"
			bottom={{ base: '1.5em', lg: '1em' }}
			left="50%"
			transform="translateX(-50%)"
			display="block"
			zIndex={10}
			pointerEvents="none"
		>
			<AnimatePresence>
				{[ScrollDirection.Initial, ScrollDirection.Up].includes(
					scrollDirection
				) && (
					<motion.div
						initial="initial"
						animate={['hidden', 'bounce']}
						variants={scrollMoreVariants}
					>
						<Icon
							w={{ base: 8, lg: 7 }}
							h={{ base: 8, lg: 7 }}
							as={RiArrowDownLine}
							color="currentColor"
							opacity="0.45"
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</Box>
	)
}

export default ScrollMore
