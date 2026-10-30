import { Target, TreeStructure } from '@phosphor-icons/react/ssr'
import type { ReactNode } from 'react'
import {
	siAnsible,
	siBluetooth,
	siClerk,
	siDotnet,
	siHtml5,
	siKubernetes,
	siNextdotjs,
	siPython,
	siReact,
	siRust,
	siTauri,
	siTerraform,
	siTurso,
} from 'simple-icons'
import { legacyIcons } from './legacyIcons'
import styles from './Stack.module.css'

const brand = (path: string) => (
	<svg viewBox="0 0 24 24" aria-hidden="true">
		<path d={path} />
	</svg>
)

/** The icon for each stack name used in config/experience.ts and config/quests.ts */
const ICONS: Record<string, ReactNode> = {
	'C#': brand(legacyIcons.csharp),
	'ASP.NET': brand(siDotnet.path),
	'.NET': brand(siDotnet.path),
	'.NET Core': brand(siDotnet.path),
	'EF 6': brand(siDotnet.path),
	LINQ: brand(siDotnet.path),
	SSIS: brand(legacyIcons.sqlServer),
	SSRS: brand(legacyIcons.sqlServer),
	'SQL Server': brand(legacyIcons.sqlServer),
	TFS: brand(legacyIcons.azureDevOps),
	'HTML / CSS / JS': brand(siHtml5.path),
	AKS: brand(siKubernetes.path),
	Terraform: brand(siTerraform.path),
	'Azure OpenAI': brand(legacyIcons.openAI),
	React: brand(siReact.path),
	Ansible: brand(siAnsible.path),
	Python: brand(siPython.path),
	Azure: brand(legacyIcons.azure),
	AWS: brand(legacyIcons.aws),
	Rust: brand(siRust.path),
	'Tauri 2': brand(siTauri.path),
	'Bluetooth LE': brand(siBluetooth.path),
	'Next.js': brand(siNextdotjs.path),
	Turso: brand(siTurso.path),
	S3: brand(legacyIcons.s3),
	Clerk: brand(siClerk.path),
	// No brand marks: a diagram for C4, the onion rings for Clean Architecture
	C4: <TreeStructure weight="fill" aria-hidden="true" />,
	'Clean Architecture': <Target weight="fill" aria-hidden="true" />,
}

/** A row of slanted chips, each with its icon */
export default function Stack({
	items,
	className,
}: {
	items: string[]
	className?: string
}) {
	return (
		<ul className={`${styles.stack} ${className ?? ''}`}>
			{items.map((item) => {
				return (
					<li key={item} className={`sl ${styles.chip}`}>
						{ICONS[item]}
						{item}
					</li>
				)
			})}
		</ul>
	)
}
