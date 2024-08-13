import { FC, useEffect, useState } from "react"
import { H3, P2 } from "./Texts"

interface FooterProps {
	time?: Date
}

export const Footer: FC<FooterProps> = ({ time }) => {
	const arrayHours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"))
	const arrayMinutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"))

	const [currentId, setCurrentId] = useState("")

	useEffect(() => {})

	useEffect(() => {
		document.title = "ChickClock - Dashboard"

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
	}, [time])

	return (
		<footer id="ClockLine" style={{ height: "var(--footer-h)" }} className="z-2 scroll-container hidden fixed bottom-0 flex ai-center jc-center gap-xxs w-100">
			{arrayHours.map((hour) => (
				<div key={hour} className="flex ai-center jc-center gap-xxxs h-xxxl">
					<div id={`${hour}:00`} className={`flex column ai-center jc-center gap-xs h-100 fast ${currentId === `${hour}:00` ? "scale-1-1" : "scale-1"}`}>
						<H3 className={`fast ${currentId === `${hour}:00` ? "color-orange" : "_color-text"}`}>{hour}</H3>
						<span style={{ width: "2px" }} className={`h-100 fast ${currentId === `${hour}:00` ? "bg-orange" : "_bg-text"}`} />
					</div>
					{arrayMinutes.map((minute) => (
						<div id={`${hour}:${minute}`} className={`flex column ai-center jc-center gap-xxs w-xxs h-100 fast ${currentId === `${hour}:${minute}` ? "scale-1-1" : "scale-1"}`}>
							<P2 className={`fast ${currentId === `${hour}:${minute}` ? "color-orange scale-1" : "_color-text scale-0"}`}>{minute}</P2>
							<span key={minute} id={`${hour}:${minute}`} style={{ width: "2px", height: "2px" }} className={`fast radius-100 ${currentId === `${hour}:${minute}` ? "bg-orange" : "_bg-text"}`} />
						</div>
					))}
				</div>
			))}
		</footer>
	)
}
