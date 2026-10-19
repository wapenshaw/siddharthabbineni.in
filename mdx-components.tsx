import YouTube from 'components/Press/YouTube'
import { youTubeId } from 'lib/postFormat'
import type { MDXComponents } from 'mdx/types'

/** Required by @next/mdx. Post styles live in components/Press/Press.module.css (.prose) */
const components: MDXComponents = {
	img: (props) => <img {...props} alt={props.alt ?? ''} loading="lazy" />,
	// [▶ Title](youtube link) embeds the video; other links stay links
	a: (props) => {
		const label = typeof props.children === 'string' ? props.children : ''
		const id = label.startsWith('▶') ? youTubeId(props.href) : undefined
		return id ? (
			<YouTube id={id} title={label.replace(/^▶\s*/, '') || 'Video'} />
		) : (
			<a {...props} />
		)
	},
}

export function useMDXComponents(): MDXComponents {
	return components
}
