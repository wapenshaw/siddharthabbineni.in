import { IconType } from 'react-icons'
import { AiOutlineAntDesign } from 'react-icons/ai'
import { CgUiKit } from 'react-icons/cg'
import { FaAws } from 'react-icons/fa'
import { IoLogoPwa, IoLogoWebComponent } from 'react-icons/io5'
import {
	SiAngular,
	SiAnsible,
	SiBlazor,
	SiDocker,
	SiDotnet,
	SiElastic,
	SiElectron,
	SiFramer,
	SiGit,
	SiGithub,
	SiGithubactions,
	SiGithubcopilot,
	SiGnubash,
	SiHelm,
	SiJquery,
	SiKubernetes,
	SiMaterialdesign,
	SiMongodb,
	SiMysql,
	SiNextdotjs,
	SiNodedotjs,
	SiOpenai,
	SiPhp,
	SiPostgresql,
	SiPython,
	SiReact,
	SiRedis,
	SiRedux,
	SiRider,
	SiSocketdotio,
	SiStorybook,
	SiStyledcomponents,
	SiTailwindcss,
	SiTerraform,
	SiUnity,
	SiVite,
	SiYarn,
} from 'react-icons/si'
import { VscAzure, VscAzureDevops } from 'react-icons/vsc'
import { TbApi, TbBrandVisualStudio, TbDatabase, TbDeviceDesktopAnalytics, TbSql } from 'react-icons/tb'
import { TfiMicrosoft } from 'react-icons/tfi'
export type SkillCategory =
	| 'cloud'
	| 'devops'
	| 'backend'
	| 'frontend'
	| 'database'
	| 'ui frameworks'
	| 'toolchains'
	| 'deliverables'
	| 'games'
	| 'desktop'

export type Skill = {
	name: string
	icon: IconType
}

export const Skills: {
	[key in SkillCategory]: Skill[]
} = {
	cloud: [
		{
			name: 'Azure',
			icon: VscAzure,
		},
		{
			name: 'AWS',
			icon: FaAws,
		},
		{
			name: 'Terraform',
			icon: SiTerraform,
		},
		{
			name: 'Kubernetes',
			icon: SiKubernetes,
		},
		{
			name: 'Ansible',
			icon: SiAnsible,
		},
		{
			name: 'Helm',
			icon: SiHelm,
		},
	],
	devops: [
		{
			name: 'Docker',
			icon: SiDocker,
		},
		{
			name: 'Azure DevOps',
			icon: VscAzureDevops,
		},
		{
			name: 'GitHub Actions',
			icon: SiGithubactions,
		},
		{
			name: 'GitHub',
			icon: SiGithub,
		},
		{
			name: 'GitHub Copilot',
			icon: SiGithubcopilot,
		},
		{
			name: 'Azure OpenAI',
			icon: SiOpenai,
		},
	],
	backend: [
		{
			name: 'C# & .NET',
			icon: SiDotnet,
		},
		{
			name: 'Python',
			icon: SiPython,
		},
		{
			name: 'Node',
			icon: SiNodedotjs,
		},
		{
			name: 'PHP',
			icon: SiPhp,
		},
	],
	frontend: [
		{
			name: 'React',
			icon: SiReact,
		},
		{
			name: 'Blazor',
			icon: SiBlazor,
		},
		{
			name: 'Redux',
			icon: SiRedux,
		},
		{
			name: 'Angular',
			icon: SiAngular,
		},
		{
			name: 'CSS Frameworks',
			icon: SiTailwindcss,
		},
		{
			name: 'JQuery',
			icon: SiJquery,
		},
	],
	database: [
		{
			name: 'MsSQL',
			icon: TbSql,
		},
		{
			name: 'PostgreSQL',
			icon: SiPostgresql,
		},
		{
			name: 'MySQL',
			icon: SiMysql,
		},
		{
			name: 'MongoDb',
			icon: SiMongodb,
		},
		{
			name: 'Redis',
			icon: SiRedis,
		},
		{
			name: 'SocketIO',
			icon: SiSocketdotio,
		},
	],
	'ui frameworks': [
		{
			name: 'MudBlazor',
			icon: SiMaterialdesign,
		},
		{
			name: 'Styled Components',
			icon: SiStyledcomponents,
		},
		{
			name: 'AntDesign',
			icon: AiOutlineAntDesign,
		},
		{
			name: 'Storybook',
			icon: SiStorybook,
		},
		{
			name: 'Framer Motion',
			icon: SiFramer,
		},
		{
			name: 'ElasticUI',
			icon: SiElastic,
		},
	],
	toolchains: [
		{
			name: 'Visual Studio',
			icon: TbBrandVisualStudio,
		},
		{
			name: 'Rider',
			icon: SiRider,
		},
		{
			name: 'VS Code',
			icon: TbBrandVisualStudio,
		},
		{
			name: 'Vite',
			icon: SiVite,
		},
		{
			name: 'Git',
			icon: SiGit,
		},
		{
			name: 'Bash',
			icon: SiGnubash,
		},
		{
			name: 'Yarn',
			icon: SiYarn,
		},
		{
			name: 'NextJS',
			icon: SiNextdotjs,
		},
	],
	deliverables: [
		{
			name: 'APIs',
			icon: TbApi,
		},
		{
			name: 'PWAs',
			icon: IoLogoPwa,
		},
		{
			name: 'Database Design',
			icon: TbDatabase,
		},
		{
			name: 'Desktop Apps',
			icon: TbDeviceDesktopAnalytics,
		},
		{
			name: 'Web Apps',
			icon: IoLogoWebComponent,
		},
		{
			name: 'User Interfaces',
			icon: CgUiKit,
		},
	],
	games: [
		{
			name: 'Unity3D',
			icon: SiUnity,
		},
	],
	desktop: [
		{
			name: 'Windows Forms, WPF',
			icon: TfiMicrosoft,
		},
		{
			name: 'Electron',
			icon: SiElectron,
		},
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
