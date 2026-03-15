'use client'

import { memo, useCallback } from 'react'
import {ClientOnly,
	Container,
	Button,
	Flex,
	Box,
	IconButton,
	Skeleton,
	useBreakpointValue} from '@chakra-ui/react'
import type { ContainerProps } from '@chakra-ui/react'
import { motion, useCycle } from 'motion/react'
import type { MotionProps } from 'motion/react'
import { LuSun, LuMoon } from 'react-icons/lu'
import styles from './styles.module.css'
import MobileMenu from './toggle'
import { ThemeMode, mobileBreakpointsMap } from 'config/theme'
import { menuAnim } from 'config/animations'
import { useColorModeValue, useColorMode } from 'components/ui/color-mode'

const MotionContainer = motion.create(Container) as React.ComponentType<ContainerProps & MotionProps>

const Navigation = () => {
	const { toggleColorMode, colorMode } = useColorMode()
	const [isOpen, toggleOpen] = useCycle(false, true)
	const isMobile = useBreakpointValue(mobileBreakpointsMap)
	const menuButtonSize = useBreakpointValue({
		base: 'xl',
		md: 'sm',
	})

	const bg = useColorModeValue(
		'rgba(237, 242, 247, 0.95)',
		'rgba(18, 18, 18, 0.9)'
	)

	const borderColor = useColorModeValue('teal.600', 'orange.200')

	const IsDark = colorMode === ThemeMode.Dark
	const btnClassName = `${styles.blogBtn} ${!IsDark && styles.dark}`
	const ThemeIcon = IsDark ? LuSun : LuMoon
	const onMenuItemClick = useCallback(
		(e: React.MouseEvent) => {
			e.stopPropagation()
			if (isMobile) {
				toggleOpen()
			}
		},
		[isMobile, toggleOpen]
	)

	return (
		<>
			<Box
				display={{ base: 'flex', xl: 'none' }}
				alignItems="center"
				className={styles.menuBar}
				zIndex={100}
				top="1.5rem"
			>
				<ClientOnly fallback={<Skeleton boxSize="10" />}>
					<IconButton
						aria-label="Color Mode"
						variant="ghost"
						boxShadow="none"
						onClick={toggleColorMode}
						padding={0}
					>
						<ThemeIcon />
					</IconButton>
				</ClientOnly>
				<MobileMenu isDarkMode={IsDark} toggle={toggleOpen} isOpen={isOpen} />
			</Box>

			<MotionContainer
				width="100%"
				backgroundColor={bg}
				maxWidth={{ base: '100%', sm: '100%', lg: '50%', xl: '60%' }}
				className={styles.menu}
				right={{ lg: '3.5%' }}
				initial="hide"
				animate={(!isMobile || isOpen) ? 'show' : undefined}
				style={{
					top: !isOpen && isMobile ? '-100vh' : undefined,
					opacity: !isOpen && isMobile ? '0' : undefined,
					left: isOpen && isMobile ? 0 : undefined,
				}}
				borderColor={isOpen && isMobile ? borderColor : undefined}
				borderBottomWidth={isOpen && isMobile ? '1px' : undefined}
				paddingBottom={isOpen && isMobile ? '1px' : undefined}
				variants={menuAnim}
				marginTop={0}
				paddingTop={1}
				as="nav"
			>
				<Flex
					justifyContent={{ base: 'center', lg: 'flex-end' }}
					direction={{ base: 'column', lg: 'row' }}
					alignItems={{ lg: 'center' }}
					flexWrap={{ lg: 'wrap' }}
					paddingX={{ base: '', sm: '10', lg: '0' }}
					paddingY={{ base: '10', lg: '3' }}
					height={{ base: '100vh', lg: 'auto' }}
					paddingRight="0"
					paddingBottom={isMobile ? 10 : '0'}
					onClick={() => isMobile && toggleOpen()}
				>
					<Box
						width={{ base: '100%', lg: 'auto' }}
						textAlign={{ base: 'center', lg: 'left' }}
					>
						<Button
							asChild
							fontWeight="light"
							variant="ghost"
							fontSize={menuButtonSize}
							letterSpacing={2}
							className={btnClassName}
							padding={2}
							marginX={2}
						>
							<a
								href={isMobile ? '#aboutMe' : '#'}
								rel="noreferrer"
								onClick={onMenuItemClick}
							>
								About
							</a>
						</Button>
					</Box>
					<Box
						width={{ base: '100%', lg: 'auto' }}
						textAlign={{ base: 'center', lg: 'left' }}
						marginY={{ base: 2, lg: 0 }}
					>
						<Button
							asChild
							fontWeight="light"
							variant="ghost"
							fontSize={menuButtonSize}
							letterSpacing={2}
							className={btnClassName}
							padding={2}
							marginX={2}
						>
							<a
								href="#experience"
								rel="noreferrer"
								onClick={onMenuItemClick}
							>
								Experience
							</a>
						</Button>
					</Box>
					<Box
						width={{ base: '100%', lg: 'auto' }}
						textAlign={{ base: 'center', lg: 'left' }}
						marginY={{ base: 2, lg: 0 }}
					>
						<Button
							asChild
							fontWeight="light"
							variant="ghost"
							fontSize={menuButtonSize}
							letterSpacing={2}
							className={btnClassName}
							padding={2}
							marginX={2}
						>
							<a
								href="#certifications"
								rel="noreferrer"
								onClick={onMenuItemClick}
							>
								Certifications
							</a>
						</Button>
					</Box>
					<Box
						width={{ base: '100%', lg: 'auto' }}
						textAlign={{ base: 'center', lg: 'left' }}
						marginY={{ base: 2, lg: 0 }}
					>
						<Button
							asChild
							fontWeight="light"
							variant="ghost"
							fontSize={menuButtonSize}
							letterSpacing={2}
							className={btnClassName}
							padding={2}
							marginX={2}
						>
							<a
								href="#blog"
								rel="noreferrer"
								onClick={onMenuItemClick}
							>
								Blog
							</a>
						</Button>
					</Box>
					<Box
						width={{ base: '100%', lg: 'auto' }}
						textAlign={{ base: 'center', lg: 'left' }}
						marginY={{ base: 2, lg: 0 }}
					>
						<Button
							asChild
							fontWeight="light"
							variant="ghost"
							fontSize={menuButtonSize}
							letterSpacing={2}
							className={btnClassName}
							padding={2}
							marginX={2}
						>
							<a
								target="_blank"
								href="/files/Siddharth-Abbineni-Resume.pdf"
								rel="noreferrer"
								onClick={onMenuItemClick}
							>
								Resume
							</a>
						</Button>
					</Box>
					<Box
						width={{ base: '100%', lg: 'auto' }}
						textAlign={{ base: 'center', lg: 'left' }}
						marginY={{ base: 2, lg: 0 }}
					>
						<Button
							asChild
							fontWeight="light"
							variant="ghost"
							fontSize={menuButtonSize}
							letterSpacing={2}
							className={btnClassName}
							padding={2}
							marginX={2}
						>
							<a
								href="#contact"
								rel="noreferrer"
								onClick={onMenuItemClick}
							>
								Contact
							</a>
						</Button>
					</Box>
					{!isMobile && (
						<Box>
							<ClientOnly fallback={<Skeleton boxSize="10" />}>
								<IconButton
									marginX={1}
									aria-label="Color Mode"
									variant="ghost"
									boxShadow="none"
									onClick={toggleColorMode}
								>
									<ThemeIcon />
								</IconButton>
							</ClientOnly>
						</Box>
					)}
				</Flex>
			</MotionContainer>
		</>
	)
}

export default memo(Navigation)
