import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useEffect, useState } from "react"

interface LoadingProps {
	children: ReactNode
}
interface LoadingContextType {
	isLoading: boolean
	setIsLoading: Dispatch<SetStateAction<boolean>>
}
const defaultLoadingContext: LoadingContextType = {
	isLoading: false,
	setIsLoading: () => {},
}
export const LoadingContext = createContext<LoadingContextType>(defaultLoadingContext)

export const LoadingProvider: FC<LoadingProps> = ({ children }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	return (
		<LoadingContext.Provider value={{ isLoading, setIsLoading }}>
			{children}
			<Loading />
		</LoadingContext.Provider>
	)
}
export const useLoading = () => {
	const context = useContext(LoadingContext)
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider")
	}
	return context
}

/***/

const Loading = () => {
	const { isLoading } = useLoading()
	const [visible, setVisible] = useState("")
	const [opacity, setOpacity] = useState("opacity-0")

	useEffect(() => {
		if (isLoading) {
			setVisible("_flex")
			setTimeout(() => setOpacity("_opacity-1"), 100)
		} else {
			setOpacity("_opacity-0")
			setTimeout(() => setVisible("_display-none"), 500)
		}
	}, [isLoading])

	return (
		<div className={`_z-5 ${visible} _jc-center _ai-center _fixed _top-0 _left-0 _w-100 _h-100 ${opacity} _bg-grayout backdrop-blur-sm _normal`}>
			<span className="_absolute _w-xl _h-xl _color-blue _border-xl _radius-100 pulse" style={{ content: " " }} />
		</div>
	)
}
