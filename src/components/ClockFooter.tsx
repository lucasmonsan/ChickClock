import { FC, useEffect, useState } from "react"

interface FooterProps {
	currentScreen: string
}

export const ClockFooter: FC<FooterProps> = ({ currentScreen }) => {
	const arrayHours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"))
	const arrayMinutes = Array.from({ length: 59 }, (_, i) => (i + 1).toString().padStart(2, "0"))

	const [currentId, setCurrentId] = useState("")

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date()
			setCurrentId(`${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`)

			const targetElement = document.getElementById(currentId)
			if (targetElement) {
				targetElement.scrollIntoView({
					block: "center",
					inline: "center",
					behavior: "smooth",
				})
			}
		}, 1000)
		return () => clearInterval(interval)
	}, [new Date()])

	useEffect(() => {
		const footer = document.getElementById("ClockLine")

		if (!footer) return

		if (currentScreen !== "splash") footer.style.opacity = "1"
	}, [currentScreen])

	return (
		<footer
			id="ClockLine"
			style={{ height: "var(--footer-h)" }}
			className={`z-1 scroll-container hidden fixed bottom-0 flex ai-center opacity-0 slow ${new Date().getHours() < 12 ? "" : "jc-center"} gap-xxs w-100`}
		>
			{arrayHours.map((hour) => (
				<div key={hour} className="flex ai-center jc-center gap-xxxs h-xxxl">
					<div id={`${hour}:00`} className={`flex column ai-center jc-center gap-xs h-100 slow ${currentId === `${hour}:00` ? "scale-1-1" : "scale-1"}`}>
						<h3 className={`family1 lh-sm fs-md color-text slow ${currentId === `${hour}:00` ? "color-color" : "color-text"}`}>{hour}</h3>
						<span style={{ width: "calc(var(--base) * 0.125)" }} className={`h-100 slow ${currentId === `${hour}:00` ? "bg-color" : "bg-text"}`} />
					</div>
					{arrayMinutes.map((minute) => (
						<div key={minute} id={`${hour}:${minute}`} className={`flex column ai-center jc-center gap-xxs w-xxs h-100 slow ${currentId === `${hour}:${minute}` ? "scale-1-1" : "scale-1"}`}>
							<p className={`family1 lh-sm fs-sm bold color-text slow ${currentId === `${hour}:${minute}` ? "color-color scale-1" : "color-text scale-0"}`}>{minute}</p>
							<span
								id={`${hour}:${minute}`}
								style={{ width: "calc(var(--base) * 0.125)", height: "calc(var(--base) * 0.125)" }}
								className={`slow ${currentId === `${hour}:${minute}` ? "bg-color" : "bg-text"}`}
							/>
						</div>
					))}
				</div>
			))}
		</footer>
	)
}
