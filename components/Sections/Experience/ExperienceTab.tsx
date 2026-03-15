'use client'

import {
	Text,
	Link,
	Stack,
	Tabs,
	Image,
	List,
	Icon,
	useBreakpointValue,
} from '@chakra-ui/react'
import { useRef, useCallback } from 'react'
import { motion } from 'motion/react'
import { BiRightArrow } from 'react-icons/bi'
import styles from './styles.module.css'
import { ExperiencesList } from 'config/experience'
import { mobileBreakpointsMap } from 'config/theme'
import { useColorModeValue, useColorMode } from 'components/ui/color-mode'

const TAB_LIST_WIDTH_DESKTOP = '130px'

const ExperienceTab = () => {
	const { colorMode } = useColorMode()
	const emphasis = useColorModeValue('teal.600', 'orange.200')
	const borderColor = useColorModeValue('gray.300', 'gray.600')
	const activeBordercolor = useColorModeValue('teal.600', '#97DFFC')
	const isMobile = useBreakpointValue(mobileBreakpointsMap)
	const tabListRef = useRef<HTMLDivElement>(null)

	const tabOrientation: 'horizontal' | 'vertical' =
		useBreakpointValue({
			base: 'horizontal' as const,
			sm: 'horizontal' as const,
			md: 'vertical' as const,
			lg: 'vertical' as const,
			xl: 'vertical' as const,
		}) ?? 'vertical'

	const tabMinWidth = useBreakpointValue({
		base: '130px',
		sm: '130px',
		md: 'auto',
		lg: 'auto',
		xl: 'auto',
	})

	// Trapped scroll: when hovering over the tab list on desktop,
	// scroll through companies before allowing page scroll
	const handleWheel = useCallback(
		(e: React.WheelEvent<HTMLDivElement>) => {
			if (isMobile) return
			const el = tabListRef.current
			if (!el) return

			const { scrollTop, scrollHeight, clientHeight } = el
			const atTop = scrollTop <= 0
			const atBottom = scrollTop + clientHeight >= scrollHeight - 1

			// If there's room to scroll within the tab list, trap the scroll
			if (scrollHeight > clientHeight) {
				if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) {
					e.stopPropagation()
					el.scrollTop += e.deltaY
				}
			}
		},
		[isMobile]
	)

	return (
		<Tabs.Root
			id="experienceTabs"
			defaultValue={ExperiencesList[0]?.name}
			orientation={tabOrientation}
			lazyMount
		>
			<Tabs.List
				ref={tabListRef}
				width={!isMobile ? TAB_LIST_WIDTH_DESKTOP : 'auto'}
				flexShrink={0}
				borderColor="transparent"
				overflowX={isMobile ? 'auto' : 'hidden'}
				overflowY={!isMobile ? 'auto' : 'hidden'}
				className={styles.experienceTabs}
				onWheel={handleWheel}
			>
				{ExperiencesList.map((company) => (
					<Tabs.Trigger
						key={`Tab-${company.name}`}
						value={company.name}
						fontSize="smaller"
						h="100px"
						width={!isMobile ? '100%' : 'auto'}
						minWidth={tabMinWidth}
						boxShadow="none"
						borderColor={borderColor}
						borderLeftWidth={tabOrientation === 'vertical' ? '4px' : '0'}
						_selected={{
							borderColor: activeBordercolor,
							boxShadow: 'none',
							borderLeftWidth: tabOrientation === 'vertical' ? '4px' : '0',
							borderBottomWidth: tabOrientation === 'horizontal' ? '4px' : '0',
							background: 'whiteAlpha.100',
						}}
						borderBottomWidth={tabOrientation === 'horizontal' ? '4px' : '0'}
					>
						<Image
							src={
								colorMode === 'dark' ? company.logo.dark : company.logo.light
							}
							alt={company.longName}
							width="80px"
							maxHeight="60px"
							objectFit="contain"
						/>
					</Tabs.Trigger>
				))}
			</Tabs.List>
			{ExperiencesList.map((company) => (
				<Tabs.Content key={`TabPanel-${company.name}`} value={company.name}>
					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
					>
						<Stack gap={0}>
							<Text
								as="span"
								fontSize="lg"
								fontWeight="bold"
								color="text.description"
							>
								{company.position}
							</Text>
							<Text as="span">
								<Link
									href={company.url}
									aria-label={company.longName}
									rel="noreferrer"
									target="_blank"
									fontSize="lg"
									fontWeight="bold"
								>
									#{company.name}
								</Link>
								<Text
									as="span"
									textTransform="none"
									fontSize="x-small"
									color="text.description"
								>
									{' '}
									{company.subDetail}
								</Text>
							</Text>
							<Text fontSize="smaller">{company.duration}</Text>
						</Stack>
						<List.Root gap={3} pt={5} listStyle="none">
							{company.roles?.map((roleDesc, idx) => (
								<List.Item
									key={`${company.name}-desc-${idx}`}
									fontSize="smaller"
									display="flex"
									alignItems="center"
									justifyContent="flex-start"
								>
									<Icon
										as={BiRightArrow}
										color={emphasis}
										display="block"
										marginRight={2}
									/>
									<Text as="span" display="block" color="text.description">
										{roleDesc}
									</Text>
								</List.Item>
							))}
						</List.Root>
					</motion.div>
				</Tabs.Content>
			))}
		</Tabs.Root>
	)
}

export default ExperienceTab
