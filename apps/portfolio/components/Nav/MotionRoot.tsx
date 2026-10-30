'use client'

import { MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'

/** With reduced motion set, Motion skips movement and keeps only fades */
export default function MotionRoot({ children }: { children: ReactNode }) {
	return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
