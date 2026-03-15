'use client'

import {
	Separator,
	Heading,
	List,
	Dialog,
	SimpleGrid,
	Text,
	Icon,
	IconButton,
} from '@chakra-ui/react'
import { LuX } from 'react-icons/lu'
import styles from './styles.module.css'
import { Skill, Skills, splitSkills } from 'config/skills'
import { useColorModeValue } from 'components/ui/color-mode'

type ISkillSetModal = {
	isOpen: boolean
	onClose(): void
}

const SkillList = ({
	title,
	columns,
}: {
	title: string
	columns: Skill[][]
}) => {
	const emphasis = useColorModeValue('#26417f', 'orange.200')
	const colOne = columns[0] ?? []
	const colTwo = columns[1] ?? []
	return (
		<>
			<Heading as="div" size="sm" paddingBottom={1} color="text.description">
				{title}
			</Heading>
			<Separator marginBottom={4} />
			<SimpleGrid columns={2} gap={4} paddingBottom={6}>
				<List.Root gap={3} listStyle="none">
					{colOne.map((item) => (
						<List.Item
							key={item.name}
							fontSize="small"
							display="flex"
							alignItems="center"
						>
							<Icon as={item.icon} color={emphasis} fontSize="2em" marginRight={2} />
							{item.name}
						</List.Item>
					))}
				</List.Root>
				<List.Root gap={3} listStyle="none">
					{colTwo.map((item) => (
						<List.Item
							key={item.name}
							fontSize="small"
							display="flex"
							alignItems="center"
						>
							<Icon as={item.icon} color={emphasis} fontSize="2em" marginRight={2} />
							{item.name}
						</List.Item>
					))}
				</List.Root>
			</SimpleGrid>
		</>
	)
}

const SkillSetModal = ({ isOpen, onClose }: ISkillSetModal) => {
	const cloudCols = splitSkills(Skills.cloud)
	const devopsCols = splitSkills(Skills.devops)
	const engineeringCols = splitSkills(Skills.engineering)
	const dataCols = splitSkills(Skills.data)
	const modalBg = useColorModeValue('white', '#1a1a1a')
	const closeBtnBg = useColorModeValue('gray.200', 'whiteAlpha.200')
	const closeBtnHover = useColorModeValue('gray.300', 'whiteAlpha.300')

	return (
		<Dialog.Root
			open={isOpen}
			onOpenChange={(e) => {
				if (!e.open) onClose()
			}}
			size="md"
		>
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content
					bg={modalBg}
					borderRadius="xl"
					boxShadow="2xl"
					position="relative"
				>
					<Dialog.Header
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						paddingRight={3}
					>
						<Text fontWeight="bold">Techs n Tools</Text>
						<IconButton
							aria-label="Close"
							variant="ghost"
							size="sm"
							bg={closeBtnBg}
							_hover={{ bg: closeBtnHover }}
							borderRadius="full"
							onClick={onClose}
						>
							<LuX />
						</IconButton>
					</Dialog.Header>
					<Dialog.Body className={styles.skillModal}>
						<SkillList title="Cloud & Infrastructure" columns={cloudCols} />
						<SkillList title="DevOps & Automation" columns={devopsCols} />
						<SkillList title="Engineering Stack" columns={engineeringCols} />
						<SkillList title="Data" columns={dataCols} />
					</Dialog.Body>
					<Dialog.Footer>
						<Text fontSize="x-small">I definitely forgot something here</Text>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	)
}

export default SkillSetModal
