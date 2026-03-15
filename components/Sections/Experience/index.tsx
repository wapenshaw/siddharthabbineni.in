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
			13+ years of full stack development and cloud architecture experience.
			Azure-certified Solutions Architect with expertise in .NET, modern web
			frameworks, and enterprise systems. Currently at&nbsp;
			<Link href="https://www.assurant.com/" target="_blank" rel="noreferrer">
				Assurant
			</Link>
			.
		</Text>

		<ExperienceTab />
	</Stack>
)

export default memo(DetailSection)
