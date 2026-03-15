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
import type { Article } from 'types/article'

const BlogList = ({ articles }: { articles: Article[] }) => {
	return (
		<Box minH="100vh" bg="bg.body" padding={{ base: 4, md: 8, lg: 16 }}>
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
								borderColor="border.divider"
								borderRadius="1em"
								padding={{ base: '1em', '2xl': '1.5em' }}
								height="100%"
								transition="all 0.2s ease-in-out"
								backgroundColor="bg.surface"
								_hover={{ background: 'bg.buttonAltHover' }}
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
								<Separator borderColor="border.divider" width="95%" />
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

export default BlogList
