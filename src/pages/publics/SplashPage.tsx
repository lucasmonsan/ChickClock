import { Main } from "../../components/Containers"
import { H1 } from "../../components/Texts"
import { useEffect } from "react"
import { useNavigation } from "../../utils/useNavigation"
import { LogoIcon } from "../../components/Icons"

export const SplashPage = () => {
	const { navigateTo } = useNavigation()

	useEffect(() => {
		document.title = "ChickClock - Splash"
		const now = new Date()
		localStorage.setItem("first", now.toISOString())
		setTimeout(() => (localStorage.getItem("chickclock") ? navigateTo("/login") : navigateTo("/welcome")), 3000)
		// localStorage.clear()
	}, [])

	return (
		<Main className="jc-center">
			<LogoIcon style={{ height: "6rem" }} />
			<H1>ChickClock!</H1>
		</Main>
	)
}
