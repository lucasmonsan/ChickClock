import { FC, ReactNode, useEffect } from "react"

interface PopupProps {
	id?: string
	children: ReactNode
	visible: boolean
	className?: string
}

export const Popup: FC<PopupProps> = ({ id = "Popup", children, visible, className }) => {
	useEffect(() => {
		const modal = document.getElementById(id)
		if (modal) {
			if (visible === true) {
				modal.style.zIndex = "4"
				modal.style.opacity = "1"
			} else if (visible === false) {
				modal.style.opacity = "0"
				setTimeout(() => {
					modal.style.zIndex = "-1"
				}, 250)
			}
		}
	}, [visible])

	return (
		<div id={id} className={`_opacity-0 _fixed _top-0 _left-0 _flex _wrap _ac-center _jc-center _ai-center _gap-xl _w-100 _h-100 _padd-xxl bg-grayout backdrop-blur-sm fast ${className}`}>
			{children}
		</div>
	)
}
