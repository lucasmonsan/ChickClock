import { useEffect } from "react"
import { Button, Image } from "../../components/Elements"
import { Main, Section } from "../../components/Containers"
import { H1, H2, P1 } from "../../components/Texts"
import { useNavigation } from "../../utils/useNavigation"
import bgImage from "../../assets/bg_welcome_page.webp"

export const WelcomePage = () => {
	const { navigateTo } = useNavigation()

	useEffect(() => {
		document.title = "ChickClock - Welcome"
		localStorage.setItem("chickclock", "true")
	}, [])

	return (
		<Main className="jc-end padd-xl">
			<Image src={bgImage} alt="Logo do ChickClock!" className="z-0 fixed w-100 h-100" />
			<Section className="column ai-start gap-sm">
				<H2 className="color-orange">Olá! Eu sou o</H2>
				<div className="flex column gap-lg">
					<H1 className="w-100 color-orange lh-xxxxl" style={{ fontSize: "4rem" }}>
						Chick
					</H1>
					<H1 className="w-100 color-orange lh-xl" style={{ fontSize: "4rem" }}>
						Clock!
					</H1>
				</div>
			</Section>
			<Section className="column h-100 jc-end">
				<P1 className="text-center text-shadow">Apenas um app pra contar o tempo até a nossa viagem pra Maceió! É isso mesmo, eu criei um app que já existe aos montes na internet.</P1>
				<Button onClick={() => navigateTo("/dashboard")} className="w-100 box-shadow">
					<H2>Continuar</H2>
				</Button>
			</Section>
		</Main>
	)
}
