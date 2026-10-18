import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Icon({ size = 16, strokeWidth = 1.7, children, ...rest }: IconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			{...rest}
		>
			{children}
		</svg>
	)
}

export const SunIcon = () => (
	<Icon strokeWidth={1.8}>
		<circle cx="12" cy="12" r="4" />
		<path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
	</Icon>
)

export const MoonIcon = () => (
	<Icon strokeWidth={1.8}>
		<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
	</Icon>
)

export const GitHubIcon = () => (
	<Icon>
		<path d="M9 19c-4 1.5-4-2-6-2.5M15 22v-3.5a3 3 0 0 0-.9-2.4c3-.3 6.1-1.5 6.1-6.6a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.7 12.7 0 0 0-6.6 0C5.8 1.9 4.7 2.2 4.7 2.2a4.8 4.8 0 0 0-.1 3.6A5.2 5.2 0 0 0 3.2 9.4c0 5.1 3.1 6.3 6.1 6.6a3 3 0 0 0-.9 2.4V22" />
	</Icon>
)

export const LinkedInIcon = () => (
	<Icon>
		<rect x="3" y="3" width="18" height="18" rx="2" />
		<path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
	</Icon>
)

export const XIcon = () => (
	<Icon size={13} strokeWidth={2}>
		<path d="M4 4l16 16M20 4L4 20" />
	</Icon>
)

export const GamepadIcon = () => (
	<Icon size={17}>
		<rect x="2" y="7" width="20" height="11" rx="5" />
		<path d="M7 11v3M5.5 12.5h3M15 12h.01M18 13h.01" />
	</Icon>
)

export const TrophyIcon = () => (
	<Icon>
		<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" />
	</Icon>
)
