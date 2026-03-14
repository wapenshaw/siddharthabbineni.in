import { Box, Heading, Icon, Link, Stack, Text } from '@chakra-ui/react'
import { memo } from 'react'
import { RiCopyleftFill } from 'react-icons/ri'

const GetInTouch = () => {
	const today = new Date()
	const year = today.getFullYear()
	return (
		<Stack
			width={{ base: '99%', lg: '60%', xl: '75%' }}
			height="100%"
			gap={{ base: 6, xl: 8 }}
			as="footer"
		>
			<Heading
				size="2xl"
				style={{
					fontVariantCaps: 'small-caps',
				}}
			>
				Reach out
			</Heading>
			<Text color="text.description">
				Being the dungeon dweller that I am, there is always an electronic
				device on/near me for me to reply. You can contact me through my socials
				on the left. The best way however, is to
				<Link
					href="mailto:siddharth.abbineni@gmail.com"
					target="_blank"
					rel="noreferrer"
				>
					&nbsp;email&nbsp;
				</Link>
				me so that I don&apos;t forget to respond. Too boomer for regular social
				media scrolling.
			</Text>
			<Box
				textAlign="center"
				fontFamily="monospace"
				paddingTop={{ base: 10, lg: 20, xl: 20 }}
				paddingBottom={{ base: 5, lg: 18 }}
			>
				<Link color="link.description"
					textDecoration="none"
					rel="noreferrer"
					href="https://siddharthabbineni.in"
					target="_blank"
					_focus={{ boxShadow: 'none' }}
				>
					<Text as="span">
						Siddharth Abbineni <Icon as={RiCopyleftFill} /> {year}
					</Text>
				</Link>
			</Box>
		</Stack>
	)
}

export default memo(GetInTouch)
