'use client'

/* eslint-disable react/no-multi-comp */

import {Box,
	Image,
	ConditionalValue,
	Separator,
	Text,
	SimpleGrid,
	Button,
	Container,
	Stack} from '@chakra-ui/react'
import type { ImageProps } from '@chakra-ui/react'
import { motion } from 'motion/react'
import type { TargetAndTransition, MotionProps } from 'motion/react'
import styles from './styles.module.css'
import { easing, DURATIONS } from 'config/animations'
import { useColorModeValue } from 'components/ui/color-mode'

export type FeaturedCardProps = {
	height: string | ConditionalValue<string>
	src: string
	idx: number
	title: string
	description: string
	objectPosition?: string
	ctaUrl: string
	isMobile?: boolean
}

const hoverVariant: TargetAndTransition = {
	scale: 1.1,
	opacity: 1,
	transition: {
		duration: DURATIONS.Fast,
		ease: 'backOut',
	},
}

const tapVariant: TargetAndTransition = {
	scale: 0.85,
	opacity: 1,
	transition: {
		duration: DURATIONS.Fast,
		ease: easing,
	},
}

const MotionImage = motion.create(Image) as React.ComponentType<ImageProps & MotionProps>

const ProjectDescription = ({
	idx,
	title,
	description,
	ctaUrl,
	isLeft,
}: {
	idx?: number
	title: string
	description: string
	ctaUrl: string
	isLeft: boolean
}) => (
	<Container
		paddingX={5}
		paddingY={1}
		display="flex"
		alignItems="center"
		justifyContent="space-around"
		flexDirection="column"
	>
		<Stack gap={1} width="100%">
			<Text
				fontSize={{ base: 'md', md: 'large', '2xl': 'xx-large' }}
				fontWeight="bold"
				letterSpacing={2}
				width="90%"
				alignSelf={isLeft ? 'flex-end' : 'flex-start'}
				textTransform="uppercase"
				as="span"
			>
				<Text color="text.accentAlt" fontSize="md" as="span">
					#0{idx}
					{'  '}
				</Text>
				{title}
			</Text>
			<Separator
				borderColor="#A6A6A6"
				width="90%"
				marginLeft={0}
				alignSelf={isLeft ? 'flex-end' : 'flex-start'}
			/>
		</Stack>
		<Text
			fontSize="smaller" color="text.accentAlt"
			width="90%"
			alignSelf={isLeft ? 'flex-end' : 'flex-start'}
			wordBreak="break-word"
			paddingY={{ base: 3, md: 0 }}
		>
			{description}
		</Text>
		<Button
			asChild
			variant="outline"
			fontWeight="light"
			fontSize={{ base: 'sm', '2xl': 'md' }}
			size="sm"
			marginY={{ base: 3, md: 0 }}
		>
			<a href={ctaUrl} rel="noreferrer" target="_blank">
				View Project
			</a>
		</Button>
	</Container>
)

const FeaturedCard = ({
	idx,
	height,
	src,
	title,
	description,
	objectPosition,
	ctaUrl,
	isMobile,
}: FeaturedCardProps) => {
	const isLeftImage = isMobile ? false : idx % 2 === 0
	const bg = useColorModeValue('blackAlpha.50', 'whiteAlpha.200')
	const CoverImage = () => (
		<MotionImage
			height={height}
			width="100%"
			src={src}
			alt={title}
			objectFit="cover"
			objectPosition={objectPosition}
			loading="lazy"
			opacity={0.75}
			whileHover={hoverVariant}
			whileTap={tapVariant}
		/>
	)

	return (
		<Box
			height="auto"
			bg={bg}
			borderRadius="1em"
			className={styles.featureCard}
			borderColor={bg}
			borderWidth="1px"
		>
			<SimpleGrid
				columns={{ base: 1, md: 2 }}
				gap={{ base: 3, md: 0 }}
				display={{ base: 'flex', md: 'grid' }}
				flexDirection={{ base: 'column-reverse', md: 'initial' }}
			>
				{isLeftImage && <CoverImage />}
				<ProjectDescription
					idx={idx}
					title={title}
					description={description}
					ctaUrl={ctaUrl}
					isLeft={isLeftImage}
				/>
				{!isLeftImage && <CoverImage />}
			</SimpleGrid>
		</Box>
	)
}
export default FeaturedCard
