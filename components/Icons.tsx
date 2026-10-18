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

export const MailIcon = () => (
	<Icon size={18}>
		<rect x="3" y="5" width="18" height="14" rx="2" />
		<path d="m3 7 9 6 9-6" />
	</Icon>
)

export const MoonIcon = () => (
	<Icon strokeWidth={1.8}>
		<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
	</Icon>
)

export const GamepadIcon = () => (
	<Icon size={17} fill="currentColor" stroke="none">
		<path d="M9.8 5.5a2.58 2.58 0 0 0-1.63-.2l-1.18.23c-.86.16-1.6.72-2 1.5-1.37 2.67-2.4 4.86-2.8 6.73-.42 1.92-.17 3.57 1.07 5.07.82 1 2.23.8 2.97-.03.56-.64 1.2-1.37 1.81-2.09.41-.47 1-.75 1.63-.75h4.66c.62 0 1.22.28 1.63.75l1.82 2.09c.73.83 2.14 1.03 2.96.03 1.24-1.5 1.49-3.15 1.08-5.07-.4-1.87-1.43-4.06-2.8-6.73a2.85 2.85 0 0 0-2-1.5l-1.19-.23c-.53-.1-1.1-.06-1.64.2a15 15 0 0 0-.43.24c-.36.19-.74.3-1.12.3h-1.28c-.38 0-.76-.11-1.11-.3L9.8 5.5ZM8.45 6.7c.27-.05.53-.02.73.09l.4.2c.54.3 1.15.47 1.8.47h1.27c.64 0 1.26-.17 1.8-.47l.4-.2c.2-.1.45-.14.73-.08l1.18.22c.43.08.8.36 1 .75 1.38 2.7 2.32 4.72 2.67 6.38.34 1.59.12 2.77-.78 3.86a.4.4 0 0 1-.35.15.64.64 0 0 1-.44-.22c-.56-.63-1.19-1.35-1.8-2.07a3.58 3.58 0 0 0-2.72-1.25H9.67c-1.04 0-2.03.46-2.7 1.25l-1.81 2.07a.64.64 0 0 1-.45.22.4.4 0 0 1-.35-.15c-.9-1.1-1.12-2.27-.78-3.87.35-1.65 1.3-3.67 2.68-6.37.2-.39.56-.67 1-.75l1.18-.22ZM12 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
	</Icon>
)

export const TrophyIcon = () => (
	<Icon>
		<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" />
	</Icon>
)
