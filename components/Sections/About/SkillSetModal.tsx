'use client'

import {
	Separator,
	Heading,
	List,
	Dialog,
	SimpleGrid,
	Text,
	Icon,
} from '@chakra-ui/react'
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
	const emphasis = useColorModeValue('blue.500', 'orange.200')
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
	const backendCols = splitSkills(Skills.backend)
	const frontendCols = splitSkills(Skills.frontend)
	const cicdCols = splitSkills(Skills.cicd)
	const dataBaseCols = splitSkills(Skills.database)
	const uiFrameWorkCols = splitSkills(Skills['ui frameworks'])
	const toolsCols = splitSkills(Skills.toolchains)
	const deliverableCols = splitSkills(Skills.deliverables)
	const desktopCols = splitSkills(Skills.desktop)
	return (
		<Dialog.Root
			open={isOpen}
			onOpenChange={(e) => {
				if (!e.open) onClose()
			}}
			size="lg"
		>
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content>
					<Dialog.Header>Techs n Tools</Dialog.Header>
					<Dialog.CloseTrigger />
					<Dialog.Body className={styles.skillModal}>
						<SkillList title="Backend" columns={backendCols} />
						<SkillList title="Frontend" columns={frontendCols} />
						<SkillList title="Databases" columns={dataBaseCols} />
						<SkillList title="Deliverables" columns={deliverableCols} />
						<SkillList title="CI/CD" columns={cicdCols} />
						<SkillList title="UI Frameworks" columns={uiFrameWorkCols} />
						<SkillList title="Desktop" columns={desktopCols} />
						<SkillList title="Tools &amp; Toolchains" columns={toolsCols} />
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
