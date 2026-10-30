import { readFileSync } from 'node:fs'
import path from 'node:path'
import YouTube from 'components/YouTube'
import { imageSize } from 'image-size'
import { youTubeId } from 'lib/format'
import type { MDXComponents } from 'mdx/types'

/** A post image's size, read from public/ at build, so the page doesn't jump as it loads */
function sizeOf(src: unknown) {
	if (typeof src !== 'string' || !src.startsWith('/')) {
		return {}
	}
	const { width, height } = imageSize(
		readFileSync(path.join(process.cwd(), 'public', decodeURI(src)))
	)
	return { width, height }
}

/** Required by @next/mdx. Post styles live in app/globals.css (.prose) */
const components: MDXComponents = {
	img: (props) => (
		<img
			{...sizeOf(props.src)}
			{...props}
			alt={props.alt ?? ''}
			loading="lazy"
		/>
	),
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
