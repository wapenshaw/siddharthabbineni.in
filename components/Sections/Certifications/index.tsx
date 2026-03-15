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

const levelColor: Record<string, [string, string]> = {
	Expert: ['purple.600', 'purple.300'],
	Specialty: ['teal.600', 'teal.300'],
	Associate: ['blue.600', 'blue.300'],
	Fundamentals: ['gray.600', 'gray.400'],
}

const CertCard = ({ cert }: { cert: Certification }) => {
	const bg = useColorModeValue('blackAlpha.50', 'whiteAlpha.100')
	const borderColor = useColorModeValue('blackAlpha.300', 'whiteAlpha.100')
	const alphaHover = useColorModeValue(
		'rgba(49, 151, 149, 0.06)',
		'rgba(157, 236, 249, 0.06)'
	)
	const [light, dark] = levelColor[cert.level] ?? ['gray.500', 'gray.400']
	const color = useColorModeValue(light, dark)
	const isExpired = cert.expired === true

	return (
		<Link
			href={cert.verifyUrl}
			target="_blank"
			rel="noreferrer"
			color="currentcolor"
			_hover={{ textDecoration: 'none' }}
		>
			{/* Square card via aspect-ratio */}
			<Box
				borderWidth="1px"
				borderColor={borderColor}
				borderRadius="1em"
				transition="all 0.2s ease-in-out"
				backgroundColor={bg}
				opacity={isExpired ? 0.5 : 1}
				filter={isExpired ? 'grayscale(0.7)' : 'none'}
				_hover={{ background: alphaHover, opacity: 1, filter: 'none' }}
				aspectRatio="1"
				width="100%"
			>
				<Stack
					gap={1}
					align="center"
					textAlign="center"
					justify="center"
					height="100%"
					padding={{ base: '0.6em', md: '1em' }}
				>
					<Image
						src={cert.badge}
						alt={cert.fullName}
						width={{ base: '36px', md: '44px' }}
						height={{ base: '36px', md: '44px' }}
						objectFit="contain"
					/>
					<Heading fontSize={{ base: 'xs', md: 'sm' }} lineHeight="short">
						{cert.name}
					</Heading>
					<Text fontSize="xs" fontWeight="bold" color={color}>
						{cert.level}
						{isExpired && ' (Expired)'}
					</Text>
					<Text fontSize="xs" color="text.description">
						{cert.earned}{' '}
						<GoLinkExternal
							style={{ display: 'inline', verticalAlign: 'middle' }}
						/>
					</Text>
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
