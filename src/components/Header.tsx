import { Dispatch, FC, SetStateAction, useEffect } from "react"
import { Button } from "./Button"

interface HeaderProps {
	currentScreen: string
	setCurrentScreen: Dispatch<SetStateAction<string>>
}

export const Header: FC<HeaderProps> = ({ currentScreen, setCurrentScreen }) => {
	useEffect(() => {
		const header = document.getElementById("Header")

		if (!header) return

		if (currentScreen !== "splash") header.style.opacity = "1"
	}, [currentScreen])

	return (
		<header
			id="Header"
			onClick={() => (window.location.href = "/")}
			style={{ height: "var(--header-h)" }}
			className={`pointer z-2 hidden fixed top-0 left-0 flex ai-center jc-center w-100 opacity-0 slow`}
		>
			<img src="./logo.svg" alt="Logo do ChickCLock!" className="h-100 padd-md" />
			<div className="flex column ai-center jc-center">
				<h1 className="family2 color-text">ChickClock!</h1>
				<h6 className="color-text family1 lh-sm">Crie seu próprio timer</h6>
			</div>
			<img src="./logo.svg" alt="Logo do ChickCLock!" className="h-100 padd-md flip-h" />
		</header>
	)
}
