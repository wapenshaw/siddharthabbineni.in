'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import {
	Box,
	Flex,
	Image,
	Link,
	Text,
} from '@chakra-ui/react'
import { AnimatePresence, motion } from 'motion/react'
import { FaSteam, FaXbox } from 'react-icons/fa'
import { IoGameController, IoTrophy } from 'react-icons/io5'
import { HiStar } from 'react-icons/hi2'
import { useColorModeValue } from 'components/ui/color-mode'
import type { SteamAchievementsResponse } from 'types/steam'
import type { XboxAchievementsResponse } from 'types/xbox'
import type { GamingAchievement, GamingData } from 'types/gaming'
import { steamToGaming, xboxToGaming, interleave } from 'types/gaming'

const MotionBox = motion.create(Box)
const fetcher = (url: string) => fetch(url).then((r) => r.json())
const ROTATE_INTERVAL = 5000
const STEAM_PROFILE_URL = 'https://steamcommunity.com/profiles/76561198043114923'

const formatDate = (unix: number): string => {
	const d = new Date(unix * 1000)
	return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/* ── Achievement Card (shared for both platforms) ── */

const AchievementCard = ({ item }: { item: GamingAchievement }) => {
	const bg = useColorModeValue('blackAlpha.50', 'whiteAlpha.100')
	const borderColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200')
	const subColor = useColorModeValue('gray.500', 'gray.400')
	const PlatformIcon = item.platform === 'steam' ? FaSteam : FaXbox

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
			{item.icon ? (
				<Image
					src={item.icon}
					alt={item.name}
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
					<PlatformIcon size={20} />
				</Flex>
			)}
			<Box flex={1} minWidth={0}>
				<Text fontSize="xs" fontWeight="bold" lineClamp={1}>
					{item.name}
				</Text>
				<Flex align="center" gap={1}>
					<PlatformIcon size={10} />
					<Text fontSize="2xs" color={subColor} lineClamp={1}>
						{item.gameName} · {formatDate(item.unlocktime)}
						{item.extra ? ` · ${item.extra}` : ''}
					</Text>
				</Flex>
			</Box>
		</Flex>
	)
}

/* ── Stat Item ── */

const StatItem = ({
	icon,
	value,
	label,
}: {
	icon: React.ReactNode
	value: string | number
	label: string
}) => {
	const subColor = useColorModeValue('gray.500', 'gray.400')
	return (
		<Flex align="center" gap={1}>
			{icon}
			<Text fontSize="xs" fontWeight="bold">
				{typeof value === 'number' ? value.toLocaleString() : value}
			</Text>
			<Text fontSize="2xs" color={subColor}>
				{label}
			</Text>
		</Flex>
	)
}

/* ── Platform Profile Box ── */

const PlatformStats = ({
	platform,
	avatarUrl,
	profileUrl,
	stats,
	align,
}: {
	platform: 'steam' | 'xbox'
	avatarUrl: string
	profileUrl: string
	stats: { games: number; perfect: number; achievements: number; extra?: string }
	align: 'left' | 'right'
}) => {
	const bg = useColorModeValue('blackAlpha.50', 'whiteAlpha.100')
	const borderColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200')
	const PlatformIcon = platform === 'steam' ? FaSteam : FaXbox
	const isLeft = align === 'left'

	const avatar = (
		<Link href={profileUrl} target="_blank" rel="noreferrer" flexShrink={0}>
			<Image
				src={avatarUrl}
				alt={platform}
				boxSize="40px"
				borderRadius="md"
				objectFit="cover"
			/>
		</Link>
	)

	const statsContent = (
		<Box flex={1} minWidth={0}>
			<Flex align="center" gap={1} mb={0.5}>
				<PlatformIcon size={11} />
				<Text fontSize="2xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
					{platform}
				</Text>
				{stats.extra && (
					<Text fontSize="2xs" fontWeight="bold" color="text.emphasis">
						{stats.extra}
					</Text>
				)}
			</Flex>
			<Flex wrap="wrap" gap={2}>
				<StatItem icon={<IoGameController size={11} />} value={stats.games} label="games" />
				<StatItem icon={<HiStar size={11} />} value={stats.perfect} label="100%" />
				<StatItem icon={<IoTrophy size={11} />} value={stats.achievements} label="ach" />
			</Flex>
		</Box>
	)

	return (
		<Flex
			bg={bg}
			borderWidth="1px"
			borderColor={borderColor}
			borderRadius="lg"
			padding={2}
			gap={2}
			align="center"
			flex={1}
			minWidth={0}
		>
			{isLeft ? (
				<>
					{avatar}
					{statsContent}
				</>
			) : (
				<>
					{statsContent}
					{avatar}
				</>
			)}
		</Flex>
	)
}

/* ── Main Widget ── */

const GamingWidget = () => {
	const [currentIndex, setCurrentIndex] = useState(0)

	const { data: steamData } = useSWR<SteamAchievementsResponse>(
		'/api/steam',
		fetcher,
		{ revalidateOnFocus: false, refreshInterval: 18_000_000 }
	)

	const { data: xboxData } = useSWR<XboxAchievementsResponse>(
		'/api/xbox',
		fetcher,
		{ revalidateOnFocus: false, refreshInterval: 18_000_000 }
	)

	const gamingData: GamingData = {
		achievements: interleave(
			steamToGaming(steamData?.achievements ?? []),
			xboxToGaming(xboxData?.achievements ?? [])
		),
		steam: steamData?.stats
			? { stats: steamData.stats, profileUrl: STEAM_PROFILE_URL }
			: undefined,
		xbox: xboxData?.profile
			? { stats: xboxData.profile }
			: undefined,
	}

	const achievements = gamingData.achievements

	useEffect(() => {
		if (achievements.length <= 1) return
		const timer = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % achievements.length)
		}, ROTATE_INTERVAL)
		return () => clearInterval(timer)
	}, [achievements.length])

	if (achievements.length === 0 && !gamingData.steam && !gamingData.xbox) {
		return null
	}

	const current = achievements[currentIndex]

	return (
		<Box width={{ base: '100%', lg: '80%' }}>
			{/* Achievement ticker */}
			{current && (
				<Box position="relative" height="56px" overflow="hidden" mb={2}>
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
							<AchievementCard item={current} />
						</MotionBox>
					</AnimatePresence>
				</Box>
			)}

			{/* Profile stats: Steam (left) | Xbox (right) */}
			<Flex gap={2}>
				{gamingData.steam && (
					<PlatformStats
						platform="steam"
						avatarUrl={gamingData.steam.stats.avatarUrl ?? ''}
						profileUrl={gamingData.steam.stats.profileUrl ?? gamingData.steam.profileUrl}
						stats={{
							games: gamingData.steam.stats.totalGames,
							perfect: gamingData.steam.stats.perfectGames,
							achievements: gamingData.steam.stats.totalAchievements,
						}}
						align="left"
					/>
				)}
				{gamingData.xbox && (
					<PlatformStats
						platform="xbox"
						avatarUrl={gamingData.xbox.stats.avatarUrl}
						profileUrl={`https://www.xbox.com/play/user/${gamingData.xbox.stats.gamertag}`}
						stats={{
							games: gamingData.xbox.stats.gamesWithAchievements,
							perfect: gamingData.xbox.stats.perfectGames,
							achievements: gamingData.xbox.stats.totalAchievements,
							extra: `${gamingData.xbox.stats.gamerscore.toLocaleString()} GS`,
						}}
						align="right"
					/>
				)}
			</Flex>
		</Box>
	)
}

export default GamingWidget
