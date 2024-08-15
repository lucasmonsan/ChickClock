import { FC, useEffect, useState } from "react"

interface TimerProps {
	currentScreen: string
	title: string
	finalDate: Date
}

export const Timer: FC<TimerProps> = ({ title, currentScreen, finalDate }) => {
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
		const timer = document.getElementById("Timer")

		if (!timer) return

		if (currentScreen === "timer") {
			timer.style.opacity = "1"
			timer.style.display = "flex"
		} else {
			timer.style.opacity = "0"
			setTimeout(() => (timer.style.display = "none"), 500)
		}
	}, [currentScreen])

	return (
		<section id="Timer" className="z-1 flex column ai-center jc-center gap-md w-100 opacity-0 slow">
			<h1 className="family1 color-text padd-md">{title}</h1>

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
	)
}
