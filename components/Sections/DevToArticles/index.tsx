'use client'

import { memo } from 'react'
import {Heading,
	Text,
	Link,
	Stack,
	SimpleGrid,
	Separator,
	Icon} from '@chakra-ui/react'
import { IoMdOpen } from 'react-icons/io'
import { Article } from 'types/article'
import { useColorModeValue } from 'components/ui/color-mode'

const DevToArticles = ({ articles }: { articles: Article[] }) => {
	const bg = useColorModeValue('blackAlpha.50', 'whiteAlpha.100')
	const borderColor = useColorModeValue('blackAlpha.300', 'whiteAlpha.100')
	const alphaHover = useColorModeValue(
		'rgba(49, 151, 149, 0.06)',
		'rgba(157, 236, 249, 0.06)'
	)
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
				Blog
			</Heading>
			<Text color="text.description">
				Enjoy these two guides while I work on restoring posts from my{' '}
				<Link
					aria-label="Old Website"
					target="_blank"
					rel="noreferrer"
					_hover={{ textDecoration: 'none' }}
					href="https://web.archive.org/web/20110203010702/http://www.siddharthabbineni.com/"
				>
					old site <Icon as={IoMdOpen} />
				</Link>
			</Text>
			<SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 5, md: 10 }}>
				{articles.map((item) => (
					<Link
						aria-label={item.title}
						target="_blank"
						rel="noreferrer"
						key={item.id}
						href={item.url}
						color="currentcolor"
						_hover={{ textDecoration: 'none' }}
						transition="all 0.5s ease"
						role="group"
					>
						<Stack
							gap={3}
							borderWidth="1px"
							borderColor={borderColor}
							borderRadius="1em"
							padding={{ base: '1em', '2xl': '1.5em' }}
							height="100%"
							transition="all 0.2s ease-in-out"
							backgroundColor={bg}
							_hover={{
								background: alphaHover,
							}}
							as="article"
						>
							<Heading fontSize="larger" paddingX={2}>
								{item.title}
							</Heading>
							<Separator borderColor="#A6A6A6" width="95%" />
							<Stack gap={1}>
								<Heading
									fontSize="small"
									paddingX={2} color="text.accentAlt"
								>
									{item.tag_list.join(', ')}
								</Heading>
								<Heading fontSize="smaller" color="text.description" paddingX={2}>
									{item.readable_publish_date}
								</Heading>
							</Stack>
							<Text fontSize="smaller" color="text.description" paddingX={2}>
								{item.description}
							</Text>
						</Stack>
					</Link>
				))}
			</SimpleGrid>
		</Stack>
	)
}

export default memo(DevToArticles)
