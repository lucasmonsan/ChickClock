import { motion } from "framer-motion"
import { FC, ReactNode } from "react"

interface ContainerProps {
	children: ReactNode
	className?: string
	style?: object
}

export const Main: FC<ContainerProps> = ({ children, className }) => {
	return (
		<motion.main
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
			className={`_flex _column _ai-center _gap-md _w-100 h-full _padd-md ${className}`}
		>
			{children}
		</motion.main>
	)
}

export const Section: FC<ContainerProps> = ({ children, className, style }) => {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.25 }}
			className={`_z-1 _flex _ai-center _gap-sm _w-100 ${className}`}
			style={style}
		>
			{children}
		</motion.section>
	)
}
