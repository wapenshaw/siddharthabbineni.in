'use client'

import { memo, useState } from 'react'
import dynamic from 'next/dynamic'
import Detail from './Detail'

const SkillSetModal = dynamic(() => import('./SkillSetModal'))

const AboutSection = () => {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<>
			<Detail onOpen={() => setIsOpen(true)} />
			<SkillSetModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</>
	)
}
export default memo(AboutSection)
