import { AnimatePresence } from "framer-motion"
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom"
import { SplashPage } from "./pages/publics/SplashPage"
import { WelcomePage } from "./pages/publics/WelcomePage"
import { DashboardPage } from "./pages/privates/DashboardPage"

export const AppRouter = () => {
	const location = useLocation()

	return (
		<AnimatePresence mode="wait">
			<Routes location={location} key={location.pathname}>
				<Route path="*" element={<SplashRedirect />}>
					<Route path="dashboard" element={<DashboardPage />} />
					<Route path="welcome" element={<WelcomePage />} />
				</Route>
				<Route path="splash" element={<SplashPage />} />
			</Routes>
		</AnimatePresence>
	)
}

const SplashRedirect = () => {
	const first = localStorage.getItem("first")

	if (!first) {
		return <Navigate to="/splash" />
	} else {
		return <Outlet />
	}
}
