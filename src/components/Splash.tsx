import { FC, useEffect } from "react"
import { LogoIcon } from "../assets/Icons"

interface SplashProps {
	currentScreen: string
}

export const Splash: FC<SplashProps> = ({ currentScreen }) => {
	useEffect(() => {
		const splash = document.getElementById("Splash")

		if (!splash) return

		if (currentScreen === "splash") {
			splash.style.opacity = "1"
			splash.style.display = "flex"
		} else {
			splash.style.opacity = "0"
			setTimeout(() => (splash.style.display = "none"), 500)
		}
	}, [currentScreen])

	return (
		<section id="Splash" className="z-2 fixed top-0 left-0 flex column ai-center jc-center gap-md w-100 h-100 opacity-0 slow" style={{ backgroundColor: "var(--bg-color)" }}>
			<LogoIcon style={{ height: "calc(var(--base) * 6)" }} />
			<h1 className="family2 color-text">ChickClock!</h1>
		</section>
	)
}
