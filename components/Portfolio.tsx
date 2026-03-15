'use client'

import { Grid, GridItem, Stack, Box } from '@chakra-ui/react'
import { useBreakpointValue } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import Menu from 'components/Menu'
import Sidebar from 'components/Sidebar'
import Avatar from 'components/Avatar'
import About from 'components/Sections/About'
import Experience from 'components/Sections/Experience'
import Certifications from 'components/Sections/Certifications'
import ScrollMore from 'components/Misc/ScrollMore'
import FadeInLayout from 'components/Layout/FadeWhenVisible'
import { Article } from 'types/article'
import { StackData } from 'types/stackoverflow'

const DevToArticles = dynamic(
	() => import('components/Sections/DevToArticles')
)
const GetInTouch = dynamic(() => import('components/Sections/GetInTouch'))

const Portfolio = ({
	articles,
	soData,
}: {
	articles: Article[]
	soData: StackData
}) => {
	const sideBarPadding = useBreakpointValue({ base: '5', md: '8', lg: '14' })
	const mainContent = useBreakpointValue({
		base: '5',
		md: '14',
		lg: '14',
		xl: 0,
	})
	const paddTop = useBreakpointValue({ base: '20', sm: 20, md: 20 })

	return (
		<>
			<Menu />
			<Grid
				id="mainGrid"
				templateColumns={{
					base: 'repeat(1, 1fr)',
					lg: 'repeat(3, 1fr)',
					xl: 'repeat(5, 1fr)',
				}}
				templateRows={{
					sm: 'repeat(1, 0)',
					lg: 'repeat(2, 1fr)',
				}}
				gap={4}
			>
				<GridItem
					padding={sideBarPadding}
					marginTop={paddTop}
					rowSpan={2}
					colSpan={{ base: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
					display="flex"
					alignContent="center"
					flexDirection={'row'}
				>
					<Sidebar soData={soData} />
				</GridItem>
				<GridItem
					as="main"
					padding={mainContent}
					rowSpan={2}
					colSpan={{ base: 1, sm: 2, md: 2, lg: 3, xl: 3 }}
					overflow="hidden"
				>
					<Stack w="100" gap={2}>
						<FadeInLayout>
							<Box
								id="aboutMe"
								className="contentRow"
								minH={{ lg: '100vh' }}
								display="flex"
								alignItems="center"
								paddingTop={{ base: 0, lg: 20, xl: 0 }}
								paddingBottom={{ base: 12, lg: 0 }}
								flexDirection={{
									base: 'column',
									lg: 'row',
								}}
							>
								<Box
									display={{ base: 'block', lg: 'none' }}
									width="100%"
								>
									<Avatar />
								</Box>
								<About />
								<Box display={{ base: 'none', lg: 'block' }}>
									<Avatar />
								</Box>
							</Box>
						</FadeInLayout>
						<FadeInLayout>
							<Box
								id="experience"
								className="contentRow"
								paddingTop={{ base: 0, lg: 20, xl: 0 }}
								paddingBottom={{ base: 12, lg: 10 }}
								paddingX={0}
								flexDirection={'row'}
							>
								<Experience />
							</Box>
						</FadeInLayout>
						<FadeInLayout>
							<Box
								id="certifications"
								className="contentRow"
								paddingTop={{ base: 0, lg: 20, xl: 0 }}
								paddingBottom={{ base: 12, lg: 10 }}
								paddingX={0}
								flexDirection={'row'}
							>
								<Certifications />
							</Box>
						</FadeInLayout>
						<FadeInLayout>
							<Box
								id="blog"
								className="contentRow"
								paddingTop={{ base: 0, lg: 20, xl: 20 }}
								paddingBottom={{ base: 12, lg: 10 }}
								paddingX={0}
								flexDirection={'row'}
							>
								<DevToArticles articles={articles} />
							</Box>
						</FadeInLayout>
						<FadeInLayout>
							<Box
								id="contact"
								className="contentRow"
								paddingTop={{ base: 0, lg: 20, xl: 20 }}
								paddingX={0}
								flexDirection={'row'}
							>
								<GetInTouch />
							</Box>
						</FadeInLayout>
					</Stack>
				</GridItem>
			</Grid>
			<ScrollMore />
		</>
	)
}

export default Portfolio
