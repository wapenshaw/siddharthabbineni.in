'use client'

import { memo } from 'react'
import {
	Heading,
	Text,
	Stack,
	SimpleGrid,
	Link,
	Box,
} from '@chakra-ui/react'
import { VscAzure } from 'react-icons/vsc'
import { IoMdOpen } from 'react-icons/io'
import { certifications } from 'config/certifications'
import { useColorModeValue } from 'components/ui/color-mode'

const Certifications = () => {
	const bg = useColorModeValue('blackAlpha.50', 'whiteAlpha.100')
	const borderColor = useColorModeValue('blackAlpha.300', 'whiteAlpha.100')
	const alphaHover = useColorModeValue(
		'rgba(49, 151, 149, 0.06)',
		'rgba(157, 236, 249, 0.06)'
	)
	const azureColor = useColorModeValue('blue.500', 'blue.300')
	const expertColor = useColorModeValue('purple.600', 'purple.300')
	const assocColor = useColorModeValue('blue.600', 'blue.300')

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
			<SimpleGrid columns={{ base: 2, md: 4 }} gap={{ base: 4, md: 6 }}>
				{certifications.map((cert) => (
					<Link
						key={cert.name}
						href={cert.verifyUrl}
						target="_blank"
						rel="noreferrer"
						color="currentcolor"
						_hover={{ textDecoration: 'none' }}
					>
						<Stack
							gap={3}
							borderWidth="1px"
							borderColor={borderColor}
							borderRadius="1em"
							padding={{ base: '1em', '2xl': '1.5em' }}
							height="100%"
							align="center"
							textAlign="center"
							transition="all 0.2s ease-in-out"
							backgroundColor={bg}
							_hover={{ background: alphaHover }}
						>
							<Box color={azureColor}>
								<VscAzure size={36} />
							</Box>
							<Heading fontSize="sm">{cert.name}</Heading>
							<Text
								fontSize="xs"
								fontWeight="bold"
								color={cert.level === 'Expert' ? expertColor : assocColor}
							>
								{cert.level}
							</Text>
							<Text fontSize="xs" color="text.description">
								Verify <IoMdOpen style={{ display: 'inline' }} />
							</Text>
						</Stack>
					</Link>
				))}
			</SimpleGrid>
		</Stack>
	)
}

export default memo(Certifications)
