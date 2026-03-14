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
	SiAngular,
	SiBlazor,
	SiDotnet,
	SiElectron,
	SiNodedotjs,
	SiReact,
	SiTypescript,
} from 'react-icons/si'
import { VscAzureDevops, VscAzure, VscDatabase } from 'react-icons/vsc'
import { useColorModeValue } from 'components/ui/color-mode'

type ISkillSetModal = {
	onOpen(): void
}

const Detail = ({ onOpen }: ISkillSetModal) => {
	const emphasis = useColorModeValue('blue.500', 'orange.200')
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
				A <b>C# and Dotnet</b> developer for as long as I can remember. I
				sometimes make <b>architectural decisions</b>.{' '}
				<Tooltip.Root>
					<Tooltip.Trigger asChild>
						<Text as="span">Avoided JavaScript 😉 </Text>
					</Tooltip.Trigger>
					<Tooltip.Positioner>
						<Tooltip.Content>No static type checking! 😠</Tooltip.Content>
					</Tooltip.Positioner>
				</Tooltip.Root>
				as much as I could until <b>Typescript</b> came along and now, I love
				making apps in <b>React</b>! Successfully delivered many commercial and
				custom solutions for various clients. Currently exploring various
				implementations for the <b>SPA + API </b>
				architecture with a touch of &quot;Microservices&quot;
				<br />
				<br />I{' '}
				<Tooltip.Root>
					<Tooltip.Trigger asChild>
						<Text as="span" color="text.emphasis">
							work on..
						</Text>
					</Tooltip.Trigger>
					<Tooltip.Positioner>
						<Tooltip.Content>at Pinion and my free time</Tooltip.Content>
					</Tooltip.Positioner>
				</Tooltip.Root>{' '}
			</Text>

			<SimpleGrid columns={2} gap={4}>
				<List.Root gap={3} listStyle="none">
					<List.Item fontSize="medium" display="flex" alignItems="center">
						<Icon as={SiDotnet} color={emphasis} fontSize="2em" marginRight={2} />
						C# &amp; Dotnet
					</List.Item>
					<List.Item fontSize="medium" display="flex" alignItems="center">
						<Icon as={SiBlazor} color={emphasis} fontSize="2em" marginRight={2} />
						Blazor
					</List.Item>
					<List.Item fontSize="medium" display="flex" alignItems="center">
						<Icon as={SiTypescript} color={emphasis} fontSize="2em" marginRight={2} />
						Typescript
					</List.Item>
					<List.Item fontSize="medium" display="flex" alignItems="center">
						<Icon as={SiNodedotjs} color={emphasis} fontSize="2em" marginRight={2} />
						Node
					</List.Item>
					<List.Item fontSize="medium" display="flex" alignItems="center">
						<Icon as={VscAzureDevops} color={emphasis} fontSize="2em" marginRight={2} />
						Azure DevOps
					</List.Item>
				</List.Root>
				<List.Root gap={3} listStyle="none">
					<List.Item fontSize="medium" display="flex" alignItems="center">
						<Icon as={SiReact} color={emphasis} fontSize="2em" marginRight={2} />
						React
					</List.Item>
					<List.Item fontSize="medium" display="flex" alignItems="center">
						<Icon as={SiAngular} color={emphasis} fontSize="2em" marginRight={2} />
						Angular
					</List.Item>
					<List.Item fontSize="medium" display="flex" alignItems="center">
						<Icon as={SiElectron} color={emphasis} fontSize="2em" marginRight={2} />
						Electron
					</List.Item>
					<List.Item fontSize="medium" display="flex" alignItems="center">
						<Icon as={VscDatabase} color={emphasis} fontSize="2em" marginRight={2} />
						SQL Server
					</List.Item>
					<List.Item fontSize="medium" display="flex" alignItems="center">
						<Icon as={VscAzure} color={emphasis} fontSize="2em" marginRight={2} />
						Azure Cloud
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
