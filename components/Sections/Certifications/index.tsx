'use client'

import { memo, useState } from 'react'
import {
	Heading,
	Text,
	Stack,
	SimpleGrid,
	Link,
	Image,
	Button,
	Box,
} from '@chakra-ui/react'
import { GoLinkExternal } from 'react-icons/go'
import { certifications, type Certification } from 'config/certifications'
import { useColorModeValue } from 'components/ui/color-mode'

const CertCard = ({ cert }: { cert: Certification }) => {
	const bg = useColorModeValue('blackAlpha.50', 'whiteAlpha.100')
	const borderColor = useColorModeValue('blackAlpha.300', 'whiteAlpha.100')
	const alphaHover = useColorModeValue(
		'rgba(49, 151, 149, 0.08)',
		'rgba(157, 236, 249, 0.06)'
	)
	const isExpired = cert.expired === true

	return (
		<Link
			href={cert.verifyUrl}
			target="_blank"
			rel="noreferrer"
			color="currentcolor"
			_hover={{ textDecoration: 'none' }}
		>
			<Box
				borderWidth="1px"
				borderColor={borderColor}
				borderRadius="1em"
				transition="all 0.2s ease-in-out"
				backgroundColor={bg}
				opacity={isExpired ? 0.45 : 1}
				filter={isExpired ? 'grayscale(0.8)' : 'none'}
				_hover={{ background: alphaHover, opacity: 1, filter: 'none' }}
				aspectRatio="1"
				width="100%"
				overflow="hidden"
			>
				<Stack
					gap={0}
					align="center"
					textAlign="center"
					height="100%"
					padding={{ base: '0.6em', md: '0.8em' }}
				>
					{/* Logo fills most of the card */}
					<Box
						flex={1}
						display="flex"
						alignItems="center"
						justifyContent="center"
						width="100%"
						minHeight={0}
					>
						<Image
							src={cert.badge}
							alt={cert.fullName}
							maxWidth="80%"
							maxHeight="100%"
							objectFit="contain"
						/>
					</Box>
					{/* Text pinned to bottom */}
					<Box flexShrink={0} paddingTop={1}>
						<Heading
							fontSize={{ base: 'xs', md: 'sm' }}
							lineHeight="short"
							lineClamp={2}
						>
							{cert.name}
						</Heading>
						<Text fontSize="xs" color="text.description" lineClamp={1}>
							{cert.earned}{' '}
							<GoLinkExternal
								style={{ display: 'inline', verticalAlign: 'middle' }}
							/>
						</Text>
					</Box>
				</Stack>
			</Box>
		</Link>
	)
}

const Certifications = () => {
	const [expanded, setExpanded] = useState(false)
	const featured = certifications.filter((c) => c.featured)
	const rest = certifications.filter((c) => !c.featured)
	const displayCerts = expanded ? certifications : featured

	return (
		<Stack
			width={{ base: '99%', lg: '60%', xl: '75%' }}
			height="100%"
			gap={{ base: 6, xl: 8 }}
		>
			<Heading
				size="2xl"
				style={{
					fontVariantCaps: 'small-caps',
				}}
			>
				Certifications
			</Heading>
			<Text color="text.description">
				Microsoft Azure certified professional with expertise across
				architecture, development, administration, and DevOps.
			</Text>
			<SimpleGrid
				columns={{ base: 2, md: 4 }}
				gap={{ base: 3, md: 4 }}
			>
				{displayCerts.map((cert) => (
					<CertCard key={cert.name} cert={cert} />
				))}
			</SimpleGrid>
			{rest.length > 0 && (
				<Button
					variant="ghost"
					size="sm"
					onClick={() => setExpanded(!expanded)}
					alignSelf="flex-start"
					color="text.accentAlt"
				>
					{expanded
						? 'Show fewer'
						: `+${rest.length} more certifications`}
				</Button>
			)}
		</Stack>
	)
}

export default memo(Certifications)
