'use client'

import { memo } from 'react'
import {
	Box,
	Heading,
	Text,
	Stack,
	SimpleGrid,
	Link,
	Separator,
} from '@chakra-ui/react'
import { IoMdArrowBack, IoMdOpen } from 'react-icons/io'
import { Article } from 'types/article'
import { useColorModeValue } from 'components/ui/color-mode'

const BlogList = ({ articles }: { articles: Article[] }) => {
	const bg = useColorModeValue('gray.50', 'gray.900')
	const cardBg = useColorModeValue('blackAlpha.50', 'whiteAlpha.100')
	const borderColor = useColorModeValue('blackAlpha.300', 'whiteAlpha.100')
	const alphaHover = useColorModeValue(
		'rgba(49, 151, 149, 0.06)',
		'rgba(157, 236, 249, 0.06)'
	)

	return (
		<Box minH="100vh" bg={bg} padding={{ base: 4, md: 8, lg: 16 }}>
			<Stack maxW="900px" mx="auto" gap={8}>
				<Link
					href="/"
					color="currentcolor"
					display="inline-flex"
					alignItems="center"
					gap={2}
					_hover={{ textDecoration: 'none' }}
					width="fit-content"
				>
					<IoMdArrowBack /> Back to Home
				</Link>
				<Heading
					size="3xl"
					style={{ fontVariantCaps: 'small-caps' }}
				>
					Blog
				</Heading>
				<Text color="text.description">
					Articles, guides, and notes on software engineering.
				</Text>
				<SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
					{articles.map((article) => (
						<Link
							key={article.id}
							href={article.url}
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
								transition="all 0.2s ease-in-out"
								backgroundColor={cardBg}
								_hover={{ background: alphaHover }}
								as="article"
							>
								{article.social_image && (
									<Box
										borderRadius="0.5em"
										overflow="hidden"
										height="180px"
									>
										<img
											src={article.social_image}
											alt={article.title}
											style={{
												width: '100%',
												height: '100%',
												objectFit: 'cover',
											}}
										/>
									</Box>
								)}
								<Heading fontSize="larger" paddingX={2}>
									{article.title}
								</Heading>
								<Separator borderColor="#A6A6A6" width="95%" />
								<Stack gap={1}>
									<Heading
										fontSize="small"
										paddingX={2}
										color="text.accentAlt"
									>
										{article.tag_list.join(', ')}
									</Heading>
									<Text
										fontSize="smaller"
										color="text.description"
										paddingX={2}
									>
										{article.readable_publish_date}
										{article.reading_time_minutes
											? ` · ${article.reading_time_minutes} min read`
											: ''}
									</Text>
								</Stack>
								<Text
									fontSize="smaller"
									color="text.description"
									paddingX={2}
								>
									{article.description}
								</Text>
								<Text
									fontSize="xs"
									color="text.accentAlt"
									paddingX={2}
								>
									Read on Dev.to <IoMdOpen style={{ display: 'inline' }} />
								</Text>
							</Stack>
						</Link>
					))}
				</SimpleGrid>
			</Stack>
		</Box>
	)
}

export default memo(BlogList)
