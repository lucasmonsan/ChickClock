import { useEffect, useState } from "react"
import { Main, Section } from "../../components/Containers"
import { H1, H2, H3 } from "../../components/Texts"
import { useNavigation } from "../../utils/useNavigation"
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { useLoading } from "../../contexts/LoadingContext"

export const DashboardPage = () => {
	const { navigateTo } = useNavigation()
	const { setIsLoading } = useLoading()

	const finalDate = new Date(2024, 7, 22, 13, 30) // 22 de Agosto de 2024, 13:30
	const [remainingTime, setRemainingTime] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	})

	useEffect(() => {
		document.title = "ChickClock - Dashboard"

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

	return (
		<Main className="padd-header padd-footer padd-l-0 padd-r-0">
			<Header />

			<Section className="column ai-center jc-center h-100 padd-0">
				<H2>Faltam</H2>

				<H1 style={{ fontSize: "calc(var(--base) * 6)", lineHeight: "calc(var(--base) * 10)" }}>
					{remainingTime.days} {remainingTime.days === 1 ? "dia" : "dias"}
				</H1>

				<div className="flex ai-center jc-center gap-md">
					<div className="flex column ai-center jc-center gap-xs">
						<H1 style={{ fontSize: "calc(var(--base) * 5.25)", lineHeight: "calc(var(--base) * 5)" }}>{remainingTime.hours.toString().padStart(2, "0")}</H1>
						<H2>{remainingTime.hours === 1 ? "hora" : "horas"}</H2>
					</div>
					<H1>:</H1>
					<div className="flex column ai-center jc-center gap-xs">
						<H1 style={{ fontSize: "calc(var(--base) * 5.25)", lineHeight: "calc(var(--base) * 5)" }}>{remainingTime.minutes.toString().padStart(2, "0")}</H1>
						<H2>{remainingTime.minutes === 1 ? "minuto" : "minutos"}</H2>
					</div>
				</div>

				<H3>&</H3>

				<div className="flex column ai-center jc-center gap-xs">
					<H1 style={{ fontSize: "calc(var(--base) * 2.5)", lineHeight: "calc(var(--base) * 3)" }}>
						{remainingTime.seconds.toString().padStart(2, "0")} {remainingTime.seconds === 1 ? "segundo" : "segundos"}
					</H1>
				</div>
			</Section>

			<Footer time={finalDate} />
		</Main>
	)
}

export default DashboardPage
