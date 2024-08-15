import { FC, MouseEvent, ReactNode } from "react"

interface ButtonProps {
	type?: "button" | "submit" | "reset"
	children: ReactNode
	className?: string
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void
	style?: object
}

export const Button: FC<ButtonProps> = ({ type = "button", children, className, onClick, style }) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`pointer w-100 padd-md fs-xl extra-bold family1 color-text border-none bold bg-color radius-sm outline-none click button-hover fast ${className}`}
			style={style}
		>
			{children}
		</button>
	)
}
