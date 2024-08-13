import { Footer } from "./Footer"
import { useEffect, useState } from "react"
import { LogoIcon } from "./Icons"

export const App = () => {
	const finalDate = new Date(2024, 7, 22, 13, 30) // 22 de Agosto de 2024, 13:30
	const [remainingTime, setRemainingTime] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	})

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date()
			const timeDiff = finalDate.getTime() - now.getTime()

			if (timeDiff >= 0) {
				const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
				const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
				const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
				const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)

				setRemainingTime({ days, hours, minutes, seconds })
			} else {
				setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 })
			}
		}, 1000)

		return () => clearInterval(interval)
	}, [finalDate])

	useEffect(() => {
		document.title = "ChickClock"
		const splash = document.getElementById("Splash")
		const dash = document.getElementById("Dashboard")

		if (splash) {
			splash.style.opacity = "1"
			setTimeout(() => {
				splash.style.opacity = "0"
				setTimeout(() => {
					splash.style.display = "none"
					if (dash) dash.style.opacity = "1"
				}, 500)
			}, 2000)
		}
	}, [])

	return (
		<>
			<main id="Dashboard" className="flex column ai-center gap-md w-100 h-full opacity-0 normal">
				<section className="z-1 flex gap-md w-100 column ai-center jc-center h-100">
					<h2 className="family1 lh-md fs-lg color-text">Faltam</h2>

					<h1 className="family1 color-text" style={{ fontSize: "calc(var(--base) * 6)", lineHeight: "calc(var(--base) * 6)" }}>
						{remainingTime.days} {remainingTime.days === 1 ? "dia" : "dias"}
					</h1>

					<div className="flex ai-center jc-center gap-md">
						<div className="flex column ai-center jc-center gap-xs">
							<h1 className="family1 color-text" style={{ fontSize: "calc(var(--base) * 5.25)", lineHeight: "calc(var(--base) * 5)" }}>
								{remainingTime.hours.toString().padStart(2, "0")}
							</h1>
							<h2 className="family1 lh-md fs-lg color-text">{remainingTime.hours === 1 ? "hora" : "horas"}</h2>
						</div>
						<h1 className="color-text">:</h1>
						<div className="flex column ai-center jc-center gap-xs">
							<h1 className="family1 color-text" style={{ fontSize: "calc(var(--base) * 5.25)", lineHeight: "calc(var(--base) * 5)" }}>
								{remainingTime.minutes.toString().padStart(2, "0")}
							</h1>
							<h2 className="family1 lh-md fs-lg color-text">{remainingTime.minutes === 1 ? "minuto" : "minutos"}</h2>
						</div>
					</div>

					<h3 className="family1 lh-sm fs-md color-text">&</h3>

					<div className="flex column ai-center jc-center gap-xs">
						<h1 className="family1 color-text" style={{ fontSize: "calc(var(--base) * 2.5)", lineHeight: "calc(var(--base) * 3)" }}>
							{remainingTime.seconds.toString().padStart(2, "0")} {remainingTime.seconds === 1 ? "segundo" : "segundos"}
						</h1>
					</div>
				</section>

				<Footer time={finalDate} />
			</main>

			<div id="Splash" className="z-2 fixed top-0 left-0 flex column ai-center jc-center gap-md w-100 h-100 opacity-0 normal" style={{ backgroundColor: "var(--bg-color)" }}>
				<LogoIcon style={{ height: "6rem" }} />
				<h1 className="family1 color-text">ChickClock!</h1>
			</div>
		</>
	)
}
