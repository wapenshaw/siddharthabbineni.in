import { IconType } from 'react-icons'
import { AiOutlineAntDesign } from 'react-icons/ai'
import { CgUiKit } from 'react-icons/cg'
import { IoLogoPwa, IoLogoWebComponent } from 'react-icons/io5'
import {
	SiAngular,
	SiBlazor,
	SiDocker,
	SiDotnet,
	SiElastic,
	SiElectron,
	SiFramer,
	SiGit,
	SiGithubactions,
	SiGnubash,
	SiJquery,
	SiMaterialdesign,
	SiMongodb,
	SiMysql,
	SiNextdotjs,
	SiNodedotjs,
	SiPhp,
	SiPostgresql,
	SiReact,
	SiRedis,
	SiRedux,
	SiRider,
	SiRuby,
	SiSocketdotio,
	SiStorybook,
	SiStyledcomponents,
	SiTailwindcss,
	SiTravisci,
	SiUnity,
	SiVite,
	SiYarn,
} from 'react-icons/si'
import { VscAzureDevops } from 'react-icons/vsc'
import { TbApi, TbBrandVisualStudio, TbDatabase, TbDeviceDesktopAnalytics, TbSql } from 'react-icons/tb'
import { TfiMicrosoft } from 'react-icons/tfi'
export type SkillCategory =
	| 'backend'
	| 'frontend'
	| 'cicd'
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
	backend: [
		{
			name: 'Dotnet',
			icon: SiDotnet,
		},
		{
			name: 'Node',
			icon: SiNodedotjs,
		},
		{
			name: 'Ruby',
			icon: SiRuby,
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
			name: 'MySQL',
			icon: SiMysql,
		},
		{
			name: 'MongoDb',
			icon: SiMongodb,
		},
		{
			name: 'PostgreSQL',
			icon: SiPostgresql,
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
	cicd: [
		{
			name: 'Azure DevOps',
			icon: VscAzureDevops,
		},
		{
			name: 'Github Actions',
			icon: SiGithubactions,
		},
		{
			name: 'Docker',
			icon: SiDocker,
		},
		{
			name: 'Travis CI',
			icon: SiTravisci,
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
