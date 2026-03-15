'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import {
	Box,
	Flex,
	Image,
	Text,
} from '@chakra-ui/react'
import { AnimatePresence, motion } from 'motion/react'
import { FaSteam } from 'react-icons/fa'
import { IoGameController, IoTrophy } from 'react-icons/io5'
import { HiStar } from 'react-icons/hi2'
import { useColorModeValue } from 'components/ui/color-mode'
import type {
	RecentAchievement,
	SteamAchievementsResponse,
	SteamProfileStats,
} from 'types/steam'

const MotionBox = motion.create(Box)

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const ROTATE_INTERVAL = 5000

const formatDate = (unix: number): string => {
	const d = new Date(unix * 1000)
	return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const AchievementCard = ({
	achievement,
}: {
	achievement: RecentAchievement
}) => {
	const bg = useColorModeValue('blackAlpha.50', 'whiteAlpha.100')
	const borderColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200')
	const subColor = useColorModeValue('gray.500', 'gray.400')

	return (
		<Flex
			bg={bg}
			borderWidth="1px"
			borderColor={borderColor}
			borderRadius="lg"
			padding={2}
			gap={2}
			align="center"
			width="100%"
			height="56px"
			overflow="hidden"
		>
			{achievement.icon ? (
				<Image
					src={achievement.icon}
					alt={achievement.name}
					boxSize="40px"
					borderRadius="md"
					objectFit="cover"
					flexShrink={0}
				/>
			) : (
				<Flex
					boxSize="40px"
					borderRadius="md"
					bg="whiteAlpha.200"
					align="center"
					justify="center"
					flexShrink={0}
				>
					<FaSteam size={20} />
				</Flex>
			)}
			<Box flex={1} minWidth={0}>
				<Text fontSize="xs" fontWeight="bold" lineClamp={1}>
					{achievement.name}
				</Text>
				<Text fontSize="2xs" color={subColor} lineClamp={1}>
					{achievement.gameName} · {formatDate(achievement.unlocktime)}
				</Text>
			</Box>
		</Flex>
	)
}

const StatItem = ({
	icon,
	value,
	label,
}: {
	icon: React.ReactNode
	value: number
	label: string
}) => {
	const subColor = useColorModeValue('gray.500', 'gray.400')
	return (
		<Flex align="center" gap={1}>
			{icon}
			<Text fontSize="sm" fontWeight="bold">
				{value.toLocaleString()}
			</Text>
			<Text fontSize="xs" color={subColor}>
				{label}
			</Text>
		</Flex>
	)
}

const ProfileStats = ({ stats }: { stats: SteamProfileStats }) => {
	const borderColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200')

	return (
		<Flex
			wrap="wrap"
			gap={3}
			paddingTop={2}
			borderTopWidth="1px"
			borderColor={borderColor}
			marginTop={1}
		>
			<StatItem
				icon={<IoGameController size={14} />}
				value={stats.totalGames}
				label="games"
			/>
			<StatItem
				icon={<HiStar size={14} />}
				value={stats.perfectGames}
				label="100%"
			/>
			<StatItem
				icon={<IoTrophy size={14} />}
				value={stats.totalAchievements}
				label="unlocked"
			/>
		</Flex>
	)
}

const SteamAchievements = () => {
	const [currentIndex, setCurrentIndex] = useState(0)

	const { data } = useSWR<SteamAchievementsResponse>(
		'/api/steam',
		fetcher,
		{
			revalidateOnFocus: false,
			refreshInterval: 18_000_000,
		}
	)

	const achievements = data?.achievements ?? []
	const stats = data?.stats

	useEffect(() => {
		if (achievements.length <= 1) return
		const timer = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % achievements.length)
		}, ROTATE_INTERVAL)
		return () => clearInterval(timer)
	}, [achievements.length])

	if (achievements.length === 0 && !stats) return null

	const current = achievements[currentIndex]

	return (
		<Box width={{ base: '100%', lg: '80%' }}>
			<Flex align="center" gap={1} marginBottom={1}>
				<FaSteam size={12} />
				<Text
					fontSize="2xs"
					fontWeight="bold"
					textTransform="uppercase"
					letterSpacing="wider"
				>
					Steam
				</Text>
			</Flex>
			{current && (
				<Box position="relative" height="56px" overflow="hidden">
					<AnimatePresence mode="wait">
						<MotionBox
							key={currentIndex}
							initial={{ rotateX: 90, opacity: 0 }}
							animate={{ rotateX: 0, opacity: 1 }}
							exit={{ rotateX: -90, opacity: 0 }}
							transition={{ duration: 0.4, ease: 'easeInOut' }}
							style={{ perspective: 600 }}
							position="absolute"
							width="100%"
						>
							<AchievementCard achievement={current} />
						</MotionBox>
					</AnimatePresence>
				</Box>
			)}
			{stats && <ProfileStats stats={stats} />}
		</Box>
	)
}

export default SteamAchievements
