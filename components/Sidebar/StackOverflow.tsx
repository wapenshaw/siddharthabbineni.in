import {
	Avatar,
	Box,
	Flex,
	Icon,
	Link,
	Stat,
} from '@chakra-ui/react'
import { FaStackOverflow } from 'react-icons/fa'
import { StackData } from 'types/stackoverflow'

interface SoBadgeProps {
	soData: StackData
}

export const StackOverflowBadge = ({ soData }: SoBadgeProps) => {
	const truncate = (number: number): string => {
		if (number >= 1e6) {
			return `${(number / 1e6).toFixed(1)}m`
		} else if (number >= 1e3) {
			return `${(number / 1e3).toFixed(1)}k`
		} else {
			return number.toString()
		}
	}

	const user = soData?.items?.[0]

	return user ? (
		<Link
			color="link.description"
			padding={1}
			aria-label="Stackoverflow"
			rel="noreferrer"
			width={12}
			href={`https://stackoverflow.com/users/${user.user_id}/`}
			target="_blank"
			_focusVisible={{ boxShadow: 'none' }}
		>
			<Flex>
				<Avatar.Root marginRight={2} marginTop={-1}>
					<Avatar.Image src={user.profile_image} />
				</Avatar.Root>
				<Icon
					paddingLeft={2}
					w={10}
					h={10}
					as={FaStackOverflow}
					color="currentColor"
				/>
				<Box>
					<Stat.Root marginLeft={1} paddingLeft={4} marginTop={-2}>
						<Stat.ValueText>{truncate(user.reputation)}</Stat.ValueText>
						<Stat.HelpText>
							<Stat.UpIndicator />
							{user.reputation_change_month}
						</Stat.HelpText>
					</Stat.Root>
				</Box>
			</Flex>
		</Link>
	) : (
		<></>
	)
}
