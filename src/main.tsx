import React from "react"
import ReactDOM from "react-dom/client"
import { AppRouter } from "./AppRouter.tsx"
import { BrowserRouter } from "react-router-dom"
import { NotificationProvider } from "./contexts/NotificationContext.tsx"
import { LoadingProvider } from "./contexts/LoadingContext.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<NotificationProvider>
			<LoadingProvider>
				<BrowserRouter>
					<AppRouter />
				</BrowserRouter>
			</LoadingProvider>
		</NotificationProvider>
	</React.StrictMode>,
)
