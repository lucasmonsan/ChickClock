import { ClockFooter } from "./components/ClockFooter"
import { useEffect, useState } from "react"
import { Splash } from "./components/Splash"
import { Timer } from "./pages/Timer"
import { Form } from "./pages/Form"
import { Header } from "./components/Header"
import "./styles/index.css"

export const App = () => {
	const urlParams = new URLSearchParams(window.location.search)

	const title = urlParams.get("t") || ""
	const day = parseInt(urlParams.get("dd") || new Date().getDate().toString())
	const month = parseInt(urlParams.get("mm") || new Date().getMonth().toString())
	const year = parseInt(urlParams.get("yyyy") || new Date().getFullYear().toString())
	const hour = parseInt(urlParams.get("hh") || new Date().getHours().toString())
	const minutes = parseInt(urlParams.get("min") || new Date().getMinutes().toString())
	const [finalDate, setFinalDate] = useState(new Date())
	const [currentScreen, setCurrentScreen] = useState("splash")

	const isValidDate = (day: number, month: number, year: number, hour: number, minutes: number): boolean => {
		const currentDate = new Date()
		const dateToCheck = new Date(year, month, day, hour, minutes)

		if (day >= 1 && day <= 31 && month >= 0 && month <= 11 && year >= currentDate.getFullYear() && hour >= 0 && hour <= 23 && minutes >= 0 && minutes <= 59 && dateToCheck > currentDate) {
			return true
		}
		return false
	}

	useEffect(() => {
		document.title = "ChickClock"

		if (isValidDate(day, month, year, hour, minutes)) {
			setFinalDate(new Date(year, month, day, hour, minutes))
			setTimeout(() => setCurrentScreen("timer"), 2000)
		} else {
			setTimeout(() => setCurrentScreen("form"), 2000)
		}
	}, [])

	return (
		<main id="Dashboard" className="relative flex column ai-center jc-center gap-md w-100 h-full padd-md">
			<Header currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />

			<Timer currentScreen={currentScreen} title={title} finalDate={finalDate} />
			<Form currentScreen={currentScreen} />

			<Splash currentScreen={currentScreen} />

			<ClockFooter currentScreen={currentScreen} />
		</main>
	)
}
