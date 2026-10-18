import type { Job } from 'config/experience'
import styles from './Campaign.module.css'

type Props = {
	logo: Job['logo']
	size: 'sm' | 'lg'
	alt?: string
	className?: string
}

/** Transparent, bordered tile; swaps to the dark variant in dark mode when there is one */
export default function CompanyLogo({
	logo,
	size,
	alt = '',
	className,
}: Props) {
	return (
		<span
			className={[
				'logo-tile',
				size === 'sm' ? styles.logoSm : styles.logoLg,
				logo.dark && 'logo-has-dark',
				className,
			]
				.filter(Boolean)
				.join(' ')}
		>
			<img className="logo-light" src={logo.light} alt={alt} />
			{logo.dark && <img className="logo-dark" src={logo.dark} alt={alt} />}
		</span>
	)
}
