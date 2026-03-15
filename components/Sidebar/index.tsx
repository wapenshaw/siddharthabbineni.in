'use client'

import {
	Box,
	Container,
	Flex,
	Heading,
	Icon,
	Image as ChkImage,
	Link,
	SimpleGrid,
	Stack,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react'
import type { BoxProps, HeadingProps, StackProps, TextProps } from '@chakra-ui/react'

import { motion } from 'motion/react'
import type { MotionProps } from 'motion/react'
import { StackOverflowBadge } from './StackOverflow'
import GamingWidget from './GamingWidget'
import styles from './styles.module.css'
import {
	fadeInUp,
	simpleOpacity,
	stagger,
} from 'config/animations'
import { SocialMedias } from 'config/sidebar'
import { AvatarImages } from 'components/Avatar'
import { useColorModeValue } from 'components/ui/color-mode'

import { StackData } from 'types/stackoverflow'
interface SideBarProps {
	soData: StackData
}

const MotionHeading = motion.create(Heading) as React.ComponentType<HeadingProps & MotionProps>
const MotionText = motion.create(Text) as React.ComponentType<TextProps & MotionProps>
const MotionStack = motion.create(Stack) as React.ComponentType<StackProps & MotionProps>
const MotionBox = motion.create(Box) as React.ComponentType<BoxProps & MotionProps>

const Sidebar = ({ soData }: SideBarProps) => {
	const surNameSize = useBreakpointValue({ base: '3xl', md: '4xl', xl: '3xl', '2xl': '4xl' })
	const mobileAvatar = useColorModeValue(
		AvatarImages.LightMode,
		AvatarImages.DarkMode
	)

	return (
		<MotionBox
			initial="initial"
			animate="animate"
			position={{ xl: 'fixed' }}
			maxWidth={{ xl: '34%' }}
			top={0}
			height={{ xl: '100vh' }}
			overflowY={{ xl: 'auto' }}
			css={{
				'&::-webkit-scrollbar': { display: 'none' },
				scrollbarWidth: 'none',
			}}
		>
			<Container
				padding={0}
				margin={0}
				display={{ xl: 'flex' }}
				flexDirection={{ xl: 'column' }}
				justifyContent={{ xl: 'center' }}
				minHeight={{ xl: '100vh' }}
			>
				<MotionStack
					variants={stagger}
					gap={{ base: 6, xl: 4, '2xl': 5 }}
					w="100%"
					paddingTop={{ xl: 14, '2xl': 4 }}
					paddingBottom={{ xl: 6, '2xl': 4 }}
				>
					<MotionBox variants={fadeInUp}>
						<Flex
							align="center"
							justify="space-between"
							gap={4}
						>
							<Box flex={1}>
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
									size={{ base: '2xl', xl: 'xl', '2xl': '2xl' }}
									className={styles.marginTopForce}
									paddingRight={{ lg: '20' }}
									textTransform="uppercase"
									variants={fadeInUp}
								>
									Abbineni
								</MotionHeading>
							</Box>
							{/* Small avatar visible only on mobile, next to the name */}
							<Box
								display={{ base: 'block', lg: 'none' }}
								flexShrink={0}
							>
								<ChkImage
									src={mobileAvatar}
									alt="Siddharth Abbineni"
									boxSize="80px"
									borderRadius="full"
									objectFit="cover"
								/>
							</Box>
						</Flex>
					</MotionBox>

					<MotionText
						colorPalette="gray"
						fontSize="md"
						className={styles.marginTopForce}
						variants={fadeInUp}
					>
						...you can call me Sid (not the Sloth)
					</MotionText>

					<MotionHeading
						as="h3"
						size={{ base: 'lg', xl: 'md', '2xl': 'lg' }} color="text.emphasis"
						className={styles.marginTopSmall}
						variants={fadeInUp}
					>
						Architect, Developer, Gamer
					</MotionHeading>

					<MotionText color="text.description"
						fontSize={{ base: 'md', xl: 'sm', '2xl': 'md' }}
						lineHeight="tall"
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
					{/* SO badge on left, social icons grid on right */}
					<MotionBox variants={simpleOpacity}>
						<Flex
							align="center"
							gap={{ base: 4, lg: 5 }}
							width={{ base: '100%', lg: '80%' }}
						>
							<Box flexShrink={0}>
								<StackOverflowBadge soData={soData} />
							</Box>
							<SimpleGrid
								columns={3}
								gap={3}
								justifyItems="end"
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
										<Icon w={6} h={6} as={socMedia.icon} color="currentColor" />
									</Link>
								))}
							</SimpleGrid>
						</Flex>
					</MotionBox>
					<MotionBox variants={simpleOpacity}>
						<GamingWidget />
					</MotionBox>
				</MotionStack>
			</Container>
		</MotionBox>
	)
}

export default Sidebar
