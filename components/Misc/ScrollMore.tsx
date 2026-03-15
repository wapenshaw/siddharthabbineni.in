'use client'

import { useEffect, useRef, useState } from 'react'
import { Box, Icon } from '@chakra-ui/react'
import { RiArrowDownLine } from 'react-icons/ri'
import { motion, AnimatePresence } from 'motion/react'

const ScrollMore = () => {
	const [visible, setVisible] = useState(true)
	const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

	useEffect(() => {
		const handleScroll = () => {
			// Hide while actively scrolling
			setVisible(false)

			// Clear previous idle timer
			if (idleTimer.current) clearTimeout(idleTimer.current)

			// Show again after 1.5s of no scrolling, unless at page bottom
			idleTimer.current = setTimeout(() => {
				const atBottom =
					window.innerHeight + window.scrollY >=
					document.body.scrollHeight - 100
				setVisible(!atBottom)
			}, 1500)
		}

		window.addEventListener('scroll', handleScroll, { passive: true })

		return () => {
			window.removeEventListener('scroll', handleScroll)
			if (idleTimer.current) clearTimeout(idleTimer.current)
		}
	}, [])

	return (
		<Box
			position="fixed"
			bottom={{ base: '1.5em', lg: '1em' }}
			left="50%"
			transform="translateX(-50%)"
			zIndex={10}
			pointerEvents="none"
		>
			<AnimatePresence>
				{visible && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{
							opacity: 1,
							y: [0, -12, 0],
							transition: {
								opacity: { duration: 0.4 },
								y: {
									duration: 1.6,
									ease: 'easeInOut',
									repeat: Infinity,
								},
							},
						}}
						exit={{ opacity: 0, y: 10, transition: { duration: 0.3 } }}
					>
						<Icon
							w={{ base: 8, lg: 7 }}
							h={{ base: 8, lg: 7 }}
							as={RiArrowDownLine}
							color="currentColor"
							opacity="0.4"
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</Box>
	)
}

export default ScrollMore
