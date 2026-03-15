'use client'

import useSWR from 'swr'
import {
	Avatar,
	Box,
	Circle,
	Flex,
	Icon,
	Link,
	Stat,
	Text,
} from '@chakra-ui/react'
import { FaStackOverflow } from 'react-icons/fa'
import type { Item, StackData } from 'types/stackoverflow'

interface SoBadgeProps {
	soData: StackData
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const truncate = (n: number): string => {
	if (n >= 1e6) return `${(n / 1e6).toFixed(1)}m`
	if (n >= 1e3) return `${(n / 1e3).toFixed(1)}k`
	return n.toString()
}

const BadgeDot = ({
	color,
	count,
}: {
	color: string
	count: number
}) =>
	count > 0 ? (
		<Flex align="center" gap={1}>
			<Circle size="10px" bg={color} />
			<Text fontSize="xs" fontWeight="bold">
				{count}
			</Text>
		</Flex>
	) : null

const UserBadges = ({ user }: { user: Item }) => {
	const { gold, silver, bronze } = user.badge_counts
	return (
		<Flex gap={3} mt={1}>
			<BadgeDot color="#FFD700" count={gold} />
			<BadgeDot color="#C0C0C0" count={silver} />
			<BadgeDot color="#CD7F32" count={bronze} />
		</Flex>
	)
}

export const StackOverflowBadge = ({ soData }: SoBadgeProps) => {
	const { data } = useSWR<StackData>('/api/stackoverflow', fetcher, {
		fallbackData: soData,
		revalidateOnFocus: false,
		refreshInterval: 3600_000,
	})

	const user = data?.items?.[0]

	if (!user) return null

	return (
		<Link
			color="text.emphasis"
			padding={1}
			aria-label="Stackoverflow"
			rel="noreferrer"
			href={`https://stackoverflow.com/users/${user.user_id}/`}
			target="_blank"
			_focusVisible={{ boxShadow: 'none' }}
			_hover={{ color: 'link.descriptionHover' }}
		>
			<Flex align="center" gap={2}>
				<Avatar.Root size="sm">
					<Avatar.Image src={user.profile_image} />
				</Avatar.Root>
				<Icon w={8} h={8} as={FaStackOverflow} color="currentColor" />
				<Box>
					<Stat.Root marginTop={-1}>
						<Stat.ValueText fontSize="lg" fontWeight="bold">
							{truncate(user.reputation)}
						</Stat.ValueText>
						<Stat.HelpText fontSize="sm">
							<Stat.UpIndicator />
							{user.reputation_change_month}
						</Stat.HelpText>
					</Stat.Root>
					<UserBadges user={user} />
				</Box>
			</Flex>
		</Link>
	)
}
