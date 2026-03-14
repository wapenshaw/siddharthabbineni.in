'use client'

import {Box,
	Image as ChkImage} from '@chakra-ui/react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'
import { avatarAnimation } from 'config/animations'
import { useColorModeValue } from 'components/ui/color-mode'

const AvatarImages = {
	DarkMode: '/SA_avatar.png',
	LightMode: './SA_avatar_light.png',
}

declare global {
	interface Window {
		preloadedPictures?: HTMLImageElement[]
	}
}

const MotionBox = motion.create(Box)

const Avatar: React.FunctionComponent = () => {
	const imgAvatar = useColorModeValue(
		AvatarImages.LightMode,
		AvatarImages.DarkMode
	)
	useEffect(() => {
		const images = [AvatarImages.DarkMode, AvatarImages.LightMode]
		const preloadedImages = images.map((imageSrc) => {
			const img = new Image()
			img.src = imageSrc
			return img
		})
		window.preloadedPictures = preloadedImages
	}, [])
	return (
		<AnimatePresence>
			<MotionBox
				id="saAvatar"
				boxSize={{ base: 64, lg: 'sm' }}
				padding={{ base: 8 }}
				marginBottom={{ base: 10, md: 0, lg: 0 }}
				initial="initial"
				animate={'animate'}
				variants={avatarAnimation}
				exit={{ opacity: 0 }}
			>
				<ChkImage
					src={imgAvatar}
					alt="Siddharth Abbineni Avatar"
					htmlWidth="250"
					htmlHeight="250"
					margin="auto"
					loading="eager"
				/>
			</MotionBox>
		</AnimatePresence>
	)
}

export default Avatar
