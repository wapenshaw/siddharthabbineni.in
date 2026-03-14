import { memo } from 'react'
import { Heading, Text, Stack, Link } from '@chakra-ui/react'
import ExperienceTab from './ExperienceTab'
const DetailSection = () => (
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
			Experience
		</Heading>
		<Text color="text.description">
			8 years of Full stack web development experience. Substantial involvement
			in software development, UI design, system analysis & design and
			enterprise project collaborations. Currently working at&nbsp;
			<Link href="https://pinion.services/" target="_blank" rel="noreferrer">
				Pinion
			</Link>
			.
		</Text>

		<ExperienceTab />
	</Stack>
)

export default memo(DetailSection)
