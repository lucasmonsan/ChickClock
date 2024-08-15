import { ClockFooter } from "./components/ClockFooter"
import { useEffect, useState } from "react"
import { Splash } from "./components/Splash"
import { Timer } from "./pages/Timer"
import { Form } from "./pages/Form"
import { Header } from "./components/Header"
import "./styles/index.css"

export const App = () => {
	// const finalDate = new Date(2024, 7, 22, 13, 30) // 22 de Agosto de 2024, 13:30
	const urlParams = new URLSearchParams(window.location.search)

	const title = urlParams.get("t") || ""
	const day = parseInt(urlParams.get("dd") || new Date().getDate().toString())
	const month = parseInt(urlParams.get("mm") || new Date().getMonth().toString())
	const year = parseInt(urlParams.get("yyyy") || new Date().getFullYear().toString())
	const hour = parseInt(urlParams.get("hh") || new Date().getHours().toString())
	const minutes = parseInt(urlParams.get("mm") || new Date().getMinutes().toString())
	const [finalDate, setFinalDate] = useState(new Date())
	const [currentScreen, setCurrentScreen] = useState("splash")

	useEffect(() => {
		document.title = "ChickClock"

		setFinalDate(new Date(year, month, day, hour, minutes))

		if (title === "") setTimeout(() => setCurrentScreen("form"), 2000)
		else setTimeout(() => setCurrentScreen("timer"), 2000)
	}, [])

	return (
		<main id="Dashboard" className="relative flex column ai-center jc-center gap-md w-100 h-full padd-md">
			<Header currentScreen={currentScreen} />

			<Timer currentScreen={currentScreen} title={title} finalDate={finalDate} />
			<Form currentScreen={currentScreen} />

			<Splash currentScreen={currentScreen} />

			<ClockFooter currentScreen={currentScreen} />
		</main>
	)
}
