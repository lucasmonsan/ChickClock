import { FC, useEffect } from "react"

interface HeaderProps {
	currentScreen: string
}

export const Header: FC<HeaderProps> = ({ currentScreen }) => {
	useEffect(() => {
		const header = document.getElementById("Header")

		if (!header) return

		if (currentScreen !== "splash") header.style.opacity = "1"
	}, [currentScreen])

	return (
		<header id="Header" style={{ height: "var(--header-h)" }} className={`z-2 hidden fixed top-0 left-0 flex ai-center jc-center w-100 opacity-0 slow`}>
			<img src="./logo.svg" alt="Logo do ChickCLock!" className="h-100 padd-md" />
			<h1 className="family2 color-text">ChickClock!</h1>
			<img src="./logo.svg" alt="Logo do ChickCLock!" className="h-100 padd-md flip-h" />
		</header>
	)
}
