import { IconType } from 'react-icons'
import { FaAws } from 'react-icons/fa'
import {
	SiAngular,
	SiAnsible,
	SiDjango,
	SiDocker,
	SiDotnet,
	SiGithubactions,
	SiKubernetes,
	SiMongodb,
	SiPython,
	SiRabbitmq,
	SiReact,
	SiRedis,
	SiTerraform,
	SiTypescript
} from 'react-icons/si'
import { TbSql } from 'react-icons/tb'
import { VscAzure, VscAzureDevops } from 'react-icons/vsc'

export type SkillCategory =
	| 'cloud'
	| 'devops'
	| 'engineering'
	| 'data'

export type Skill = {
	name: string
	icon: IconType
}

export const Skills: {
	[key in SkillCategory]: Skill[]
} = {
	cloud: [
		{ name: 'Azure', icon: VscAzure },
		{ name: 'AWS', icon: FaAws },
		{ name: 'Terraform', icon: SiTerraform },
		{ name: 'Kubernetes', icon: SiKubernetes },
	],
	devops: [
		{ name: 'Docker', icon: SiDocker },
		{ name: 'Ansible', icon: SiAnsible },
		{ name: 'GitHub Actions', icon: SiGithubactions },
		{ name: 'Azure DevOps', icon: VscAzureDevops },
	],
	engineering: [
		{ name: 'C# & .NET', icon: SiDotnet },
		{ name: 'Python', icon: SiPython },
		{ name: 'React', icon: SiReact },
		{ name: 'Django', icon: SiDjango },
		{ name: 'Angular', icon: SiAngular },
		{ name: 'TypeScript', icon: SiTypescript },
	],
	data: [
		{ name: 'MsSQL', icon: TbSql },
		{ name: 'MongoDB', icon: SiMongodb },
		{ name: 'Redis', icon: SiRedis },
		{ name: 'Rabbitmq', icon: SiRabbitmq },
	],
}

export const splitSkills = (srcArray: Skill[]) => {
	const arrLength = srcArray.length
	const isEvenChunk = arrLength % 2 === 0

	let chunk = 4
	if (isEvenChunk) {
		chunk = arrLength / 2
	} else if (arrLength <= 5 && arrLength > 2) {
		chunk = 3
	}

	let i = 0
	let j = 0
	const temporary = []
	for (i = 0, j = srcArray.length; i < j; i += chunk) {
		temporary.push(srcArray.slice(i, i + chunk))
	}
	return temporary
}
