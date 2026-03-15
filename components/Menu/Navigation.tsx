'use client'

import { memo, useCallback } from 'react'
import {Container,
	Button,
	Flex,
	Box,
	IconButton,
	useBreakpointValue} from '@chakra-ui/react'
import type { ContainerProps } from '@chakra-ui/react'
import { motion, useCycle } from 'motion/react'
import type { MotionProps } from 'motion/react'
import { LuSun, LuMoon } from 'react-icons/lu'
import styles from './styles.module.css'
import MobileMenu from './toggle'
import { ThemeMode, mobileBreakpointsMap } from 'config/theme'
import { menuAnim } from 'config/animations'
import useScrollDirection, { ScrollDirection } from 'hooks/useScrollDirection'
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

	const borderColor = useColorModeValue('blue.500', 'orange.200')

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
	const scrollDirection = useScrollDirection()

	return (
		<>
			<Box
				display={{ base: 'flex', xl: 'none' }}
				alignItems="center"
				paddingTop={1}
				className={styles.menuBar}
				zIndex={100}
				top="3%"
			>
				<IconButton
					aria-label="Color Mode"
					variant="ghost"
					boxShadow="none"
					onClick={toggleColorMode}
					padding={0}
				>
					<ThemeIcon />
				</IconButton>
				<MobileMenu isDarkMode={IsDark} toggle={toggleOpen} isOpen={isOpen} />
			</Box>

			<MotionContainer
				width="100%"
				backgroundColor={bg}
				maxWidth={{ base: '100%', sm: '100%', lg: '50%', xl: '60%' }}
				className={styles.menu}
				right={{
					lg:
						!isMobile && scrollDirection === ScrollDirection.Down
							? '2%'
							: '3.5%',
				}}
				initial="hide"
				animate={(!isMobile || isOpen) ? 'show' : undefined}
				style={{
					width:
						!isMobile && scrollDirection === ScrollDirection.Down
							? '12%'
							: '100%',
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
					direction={{
						base: 'column',
						lg: scrollDirection === ScrollDirection.Down ? 'column' : 'row',
					}}
					paddingX={{ base: '', sm: '10', lg: '0' }}
					paddingY={{
						base: '10',
						lg: scrollDirection === ScrollDirection.Down ? '10' : '3',
					}}
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
							<IconButton
								marginX={1}
								aria-label="Color Mode"
								variant="ghost"
								boxShadow="none"
								onClick={toggleColorMode}
							>
								<ThemeIcon />
							</IconButton>
						</Box>
					)}
				</Flex>
			</MotionContainer>
		</>
	)
}

export default memo(Navigation)
