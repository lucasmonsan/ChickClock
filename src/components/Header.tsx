import { FC } from "react"

interface HeaderProps {
	className?: string
}

export const Header: FC<HeaderProps> = ({ className }) => {
	return <header className={`_z-2 _fixed _top-0 _flex ai-center jc-center _w-100 _padd-r-xl _padd-l-xl _padd-t-md _bg-grayout ${className}`}></header>
}
