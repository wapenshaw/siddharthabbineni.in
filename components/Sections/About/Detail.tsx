'use client'

import {
	Box,
	Heading,
	Icon,
	List,
	SimpleGrid,
	Stack,
	Text,
	Tooltip,
} from '@chakra-ui/react'
import { memo } from 'react'
import { IoMdOpen } from 'react-icons/io'
import {
	SiDotnet,
	SiKubernetes,
	SiPython,
	SiReact,
	SiTerraform,
	SiTypescript,
} from 'react-icons/si'
import { VscAzure } from 'react-icons/vsc'
import { FaAws } from 'react-icons/fa'
import { useColorModeValue } from 'components/ui/color-mode'

type ISkillSetModal = {
	onOpen(): void
}

const Detail = ({ onOpen }: ISkillSetModal) => {
	const emphasis = useColorModeValue('#26417f', 'orange.200')
	// const currentYear = new Date().getFullYear()
	// const professionalYears = currentYear - 2010

	return (
		<Stack
			width={{ base: '100%', lg: '70%' }}
			gap={{ base: 6, xl: 8 }}
			as="section"
		>
			<Heading
				as="h4"
				size="2xl"
				letterSpacing={1.8}
				style={{
					fontVariantCaps: 'small-caps',
				}}
			>
				About Me
			</Heading>
			<Text color="text.description">
				An <b>Azure-certified Cloud &amp; Solutions Architect</b> who still writes code -
				because someone has to make sure the architecture actually works. 😉
				{' '}
				<Tooltip.Root>
					<Tooltip.Trigger asChild>
						<Text as="span">Avoided JavaScript </Text>
					</Tooltip.Trigger>
					<Tooltip.Positioner>
						<Tooltip.Content>No static type checking! 😠</Tooltip.Content>
					</Tooltip.Positioner>
				</Tooltip.Root>
				until <b>TypeScript</b> saved the day, and now I architect cloud
				platforms while sneaking in <b>React</b> apps on the side.
				13+ years building everything from ERPs to microservices across{' '}
				<b>Azure</b>, <b>AWS</b>, and everything in between.
				<br />
				<br />
				Currently spearheading cloud automation at <b>Assurant</b> — building
				platforms for infrastructure provisioning, managing Kubernetes clusters,
				and deploying cloud-native services across Azure &amp; AWS.
				<br />
				<br />I{' '}
				<Tooltip.Root>
					<Tooltip.Trigger asChild>
						<Text as="span" color="text.emphasis">
							work on..
						</Text>
					</Tooltip.Trigger>
					<Tooltip.Positioner>
						<Tooltip.Content>at Assurant and my free time</Tooltip.Content>
					</Tooltip.Positioner>
				</Tooltip.Root>{' '}
			</Text>

			<SimpleGrid columns={2} gap={4}>
				<List.Root gap={3} listStyle="none">
					<List.Item fontSize="medium" display="flex" alignItems="center">
						<Icon as={VscAzure} color={emphasis} fontSize="2em" marginRight={2} />
						Azure
					</List.Item>
					<List.Item fontSize="medium" display="flex" alignItems="center">
						<Icon as={FaAws} color={emphasis} fontSize="2em" marginRight={2} />
						AWS
					</List.Item>
					<List.Item fontSize="medium" display="flex" alignItems="center">
						<Icon as={SiTerraform} color={emphasis} fontSize="2em" marginRight={2} />
						Terraform
					</List.Item>
					<List.Item fontSize="medium" display="flex" alignItems="center">
						<Icon as={SiKubernetes} color={emphasis} fontSize="2em" marginRight={2} />
						Kubernetes
					</List.Item>
				</List.Root>
				<List.Root gap={3} listStyle="none">
					<List.Item fontSize="medium" display="flex" alignItems="center">
						<Icon as={SiDotnet} color={emphasis} fontSize="2em" marginRight={2} />
						C# &amp; .NET
					</List.Item>
					<List.Item fontSize="medium" display="flex" alignItems="center">
						<Icon as={SiPython} color={emphasis} fontSize="2em" marginRight={2} />
						Python
					</List.Item>
					<List.Item fontSize="medium" display="flex" alignItems="center">
						<Icon as={SiReact} color={emphasis} fontSize="2em" marginRight={2} />
						React
					</List.Item>
					<List.Item fontSize="medium" display="flex" alignItems="center">
						<Icon as={SiTypescript} color={emphasis} fontSize="2em" marginRight={2} />
						TypeScript
					</List.Item>
				</List.Root>
				<Box>
					<Text
						as="button"
						color="text.emphasis"
						fontSize="smaller"
						textAlign="left"
						onClick={onOpen}
					>
						..and worked on.. <Icon as={IoMdOpen} />
					</Text>
				</Box>
			</SimpleGrid>
		</Stack>
	)
}

export default memo(Detail)
