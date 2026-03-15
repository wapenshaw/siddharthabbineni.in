'use client'

import {
	Box,
	Container,
	Heading,
	Icon,
	Link,
	Stack,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react'
import type { BoxProps, HeadingProps, StackProps, TextProps } from '@chakra-ui/react'

import { motion } from 'motion/react'
import type { MotionProps } from 'motion/react'
import { StackOverflowBadge } from './StackOverflow'
import styles from './styles.module.css'
import {
	fadeInUp,
	simpleOpacity,
	stagger,
} from 'config/animations'
import { SocialMedias } from 'config/sidebar'

import { StackData } from 'types/stackoverflow'
interface SideBarProps {
	soData: StackData
}

const MotionHeading = motion.create(Heading) as React.ComponentType<HeadingProps & MotionProps>
const MotionText = motion.create(Text) as React.ComponentType<TextProps & MotionProps>
const MotionStack = motion.create(Stack) as React.ComponentType<StackProps & MotionProps>
const MotionBox = motion.create(Box) as React.ComponentType<BoxProps & MotionProps>

const Sidebar = ({ soData }: SideBarProps) => {
	const surNameSize = useBreakpointValue({ base: '3xl', md: '4xl' })

	return (
		<MotionBox
			initial="initial"
			animate="animate"
			position={{ xl: 'fixed' }}
			maxWidth={{ xl: '34%' }}
			top={{ lg: 0 }}
		>
			<Container
				padding={0}
				margin={0}
				height={{ xl: '100vh' }}
				display={{ xl: 'flex' }}
				alignItems={{ xl: 'center' }}
			>
				<MotionStack variants={stagger} gap={6} w="100">
					<MotionText
						variants={fadeInUp}
						transition={{ delay: 1 }}
						color="text.accent"
						fontWeight="light"
					>
						బ్రెయిన్ వాడితే స్ట్రైన్ తగుద్ది రా చారి!
					</MotionText>
					<MotionHeading
						as="h2"
						size={surNameSize as HeadingProps['size']}
						color="text.emphasis"
						textTransform="uppercase"
						variants={simpleOpacity}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
					>
						Siddharth
					</MotionHeading>
					<MotionHeading
						as="h1"
						size="2xl"
						className={styles.marginTopForce}
						paddingRight={{ lg: '20' }}
						textTransform="uppercase"
						variants={fadeInUp}
					>
						Abbineni
					</MotionHeading>

					<MotionText
						colorPalette="gray"
						fontSize="small"
						className={styles.marginTopForce}
						variants={fadeInUp}
					>
						...you can call me Sid (not the Sloth)
					</MotionText>

					<MotionHeading
						as="h3"
						size="md" color="text.emphasis"
						className={styles.marginTopSmall}
						variants={fadeInUp}
					>
						Architect, Developer, Gamer
					</MotionHeading>

					<MotionText color="text.description"
						fontSize="medium"
						paddingRight={{ lg: '12' }}
						variants={fadeInUp}
						maxWidth={{ base: '100%', lg: '80%' }}
					>
						Hello 👋 Welcome! I am a{' '}
						<Text color="text.emphasis" as="span">
							cloud &amp; software architect
						</Text>{' '}
						based in Hyderabad, IN. An ex-pro{' '}
						<Text color="text.emphasis" as="span">
							Q3A &amp; age2x
						</Text>{' '}
						player now turned into a casual. I play dota2 when I need to get mad
						and Anno 1800/Cities Skylines when I need to chill.
					</MotionText>
					<MotionBox display="flex" variants={simpleOpacity}>
						<StackOverflowBadge soData={soData} />
					</MotionBox>
					<MotionBox
						style={{ margin: 0 }}
						display="flex"
						justifyContent="space-between"
						width={{ base: '100%', lg: '80%' }}
						variants={simpleOpacity}
					>
						{SocialMedias.map((socMedia) => (
							<Link
								color="text.emphasis"
								key={socMedia.label}
								aria-label={socMedia.label}
								rel="noreferrer"
								href={socMedia.href}
								target="_blank"
								_focusVisible={{ boxShadow: 'none' }}
								_hover={{ color: 'link.descriptionHover' }}
								transition="color 0.2s"
							>
								<Icon w={7} h={7} as={socMedia.icon} color="currentColor" />
							</Link>
						))}
					</MotionBox>
				</MotionStack>
			</Container>
		</MotionBox>
	)
}

export default Sidebar
