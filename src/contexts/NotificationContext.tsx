import { FC, createContext, useState, ReactNode, Dispatch, SetStateAction, useContext, useEffect, MouseEvent } from "react"
import { H2 } from "../components/Texts"
import { P1 } from "../components/Texts"
import { Button } from "../components/Elements"
import { ErrorIcon, SuccessIcon } from "../components/Icons"

interface NotificationProviderProps {
	children: ReactNode
}
interface NotificationProps {
	type: string
	title: string
	message: string
	button?: string | undefined
	autoClose?: boolean
	timer?: number
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}
interface NotificationContextType {
	notification: NotificationProps
	setNotification: Dispatch<SetStateAction<NotificationProps>>
}
const defaultNotification: NotificationProps = {
	type: "",
	title: "",
	message: "",
	button: undefined,
	autoClose: false,
	timer: 2000,
}
const defaultNotificationContext: NotificationContextType = {
	notification: defaultNotification,
	setNotification: () => {},
}
export const NotificationContext = createContext<NotificationContextType>(defaultNotificationContext)

export const NotificationProvider: FC<NotificationProviderProps> = ({ children }) => {
	const [notification, setNotification] = useState<NotificationProps>(defaultNotification)

	return (
		<NotificationContext.Provider value={{ notification, setNotification }}>
			{children}
			<Notification />
		</NotificationContext.Provider>
	)
}

export const useNotification = () => {
	const context = useContext(NotificationContext)
	if (context === undefined) {
		throw new Error("useNotification must be used within an NotificationProvider")
	}
	return context
}

/***/

const Notification = () => {
	const { notification, setNotification } = useNotification()

	useEffect(() => {
		const divNotification = document.getElementById("DivNotification")
		const divContainer = document.getElementById("DivContainer")
		if (divNotification && divContainer && notification.title) {
			setTimeout(() => {
				divNotification.style.opacity = "1"
				divContainer.style.transform = "translateY(0)"
				notification.autoClose === true && setTimeout(() => handleClose(), notification.timer ? notification.timer : 2000)
			}, 100)
		}
	}, [notification])

	const handleClose = () => {
		const divNotification = document.getElementById("DivNotification")
		const divContainer = document.getElementById("DivContainer")
		if (divNotification && divContainer && notification.title) {
			divNotification.style.opacity = "0"
			divContainer.style.transform = "translateY(100%)"
			setTimeout(() => setNotification(defaultNotification), 500)
		}
	}

	return notification.title ? (
		<div id="DivNotification" className="_z-3 _hidden _fixed _top-0 _left-0 _flex _ai-end _jc-center _w-100 _h-100 _padd-0-xl _opacity-0 _bg-grayout _fast">
			<div
				id="DivContainer"
				className="_flex _column _ai-center _jc-center _gap-sm _w-100 _padd-xl _bg-comp _border-lg _color-orange _radius-t-l-md _radius-t-r-md _border-b-none _box-shadow _fast _translate-y-full"
			>
				{notification.type === "success" && <SuccessIcon />}
				{notification.type === "error" && <ErrorIcon />}

				<H2 className="text-center lh-lg">{notification.title}</H2>

				<P1 className="text-center">{notification.message}</P1>

				{notification.button !== undefined && notification.autoClose !== true && (
					<Button onClick={() => handleClose()} className="w-100">
						<H2>{notification.button}</H2>
					</Button>
				)}
			</div>
		</div>
	) : null
}
