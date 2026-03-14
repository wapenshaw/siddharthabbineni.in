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
import { motion } from 'motion/react'
import { BiRightArrow } from 'react-icons/bi'
import styles from './styles.module.css'
import { ExperiencesList } from 'config/experience'
import { mobileBreakpointsMap } from 'config/theme'
import { useColorModeValue, useColorMode } from 'components/ui/color-mode'

const ExperienceTab = () => {
	const { colorMode } = useColorMode()
	const emphasis = useColorModeValue('blue.500', 'orange.200')
	const borderColor = useColorModeValue('gray.300', 'gray.600')
	const activeBordercolor = useColorModeValue('blue.500', '#97DFFC')
	const isMobile = useBreakpointValue(mobileBreakpointsMap)

	const tabOrientation: 'horizontal' | 'vertical' =
		useBreakpointValue({
			base: 'horizontal' as const,
			sm: 'horizontal' as const,
			md: 'vertical' as const,
			lg: 'vertical' as const,
			xl: 'vertical' as const,
		}) ?? 'vertical'

	const tabMinWidth = useBreakpointValue({
		base: '160px',
		sm: '160px',
		md: 'auto',
		lg: 'auto',
		xl: 'auto',
	})
	return (
		<Tabs.Root
			id="experienceTabs"
			defaultValue={ExperiencesList[0]?.name}
			orientation={tabOrientation}
			lazyMount
		>
			<Tabs.List
				width={!isMobile ? '30%' : 'auto'}
				borderColor="transparent"
				overflowX={isMobile ? 'scroll' : 'auto'}
				overflowY={'hidden'}
				className={styles.experienceTabs}
			>
				{ExperiencesList.map((company) => (
					<Tabs.Trigger
						key={`Tab-${company.name}`}
						value={company.name}
						fontSize="smaller"
						h="120px"
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
							maxWidth="88px"
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
									aria-label="scentregroup"
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
