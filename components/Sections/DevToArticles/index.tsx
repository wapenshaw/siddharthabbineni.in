'use client'

import { memo } from 'react'
import {Heading,
	Text,
	Flex,
	Link,
	Stack,
	SimpleGrid,
	Separator} from '@chakra-ui/react'
import { Article } from 'types/article'
import { useColorModeValue } from 'components/ui/color-mode'

const MAX_HOME_ARTICLES = 4

const DevToArticles = ({ articles }: { articles: Article[] }) => {
	const bg = useColorModeValue('blackAlpha.50', 'whiteAlpha.100')
	const borderColor = useColorModeValue('blackAlpha.300', 'whiteAlpha.100')
	const alphaHover = useColorModeValue(
		'rgba(49, 151, 149, 0.06)',
		'rgba(157, 236, 249, 0.06)'
	)
	const displayArticles = articles.slice(0, MAX_HOME_ARTICLES)

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
			<Text color="text.description" fontSize="md">
				Latest articles and guides on software engineering.
			</Text>
			<SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
				{displayArticles.map((item) => (
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
							gap={2}
							borderWidth="1px"
							borderColor={borderColor}
							borderRadius="1em"
							padding={{ base: '1em', '2xl': '1.5em' }}
							transition="all 0.2s ease-in-out"
							backgroundColor={bg}
							_hover={{
								background: alphaHover,
							}}
							as="article"
						>
							<Heading
								fontSize={{ base: 'md', md: 'lg' }}
								paddingX={2}
								lineClamp={1}
							>
								{item.title}
							</Heading>
							<Separator borderColor="#A6A6A6" width="95%" />
							<Flex
								justify="space-between"
								align="center"
								paddingX={2}
								wrap="wrap"
								gap={1}
							>
								<Text
									fontSize="sm"
									color="text.accentAlt"
									fontWeight="medium"
								>
									{item.tag_list.join(', ')}
								</Text>
								<Text fontSize="sm" color="text.description">
									{item.readable_publish_date}
								</Text>
							</Flex>
							<Text
								fontSize="sm"
								color="text.description"
								paddingX={2}
								lineClamp={2}
							>
								{item.description}
							</Text>
						</Stack>
					</Link>
				))}
			</SimpleGrid>
			<Link
				href="https://dev.to/wapenshaw"
				target="_blank"
				rel="noreferrer"
				color="text.accentAlt"
				fontWeight="medium"
				_hover={{ textDecoration: 'underline' }}
			>
				Read more on Dev.to →
			</Link>
		</Stack>
	)
}

export default memo(DevToArticles)
