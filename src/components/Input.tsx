import { ChangeEvent, FC } from "react"

interface InputProps {
	required?: boolean
	type?: string
	autoComplete?: string
	value: string | number | readonly string[]
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
	placeholder?: string
	maxLength?: number
	className?: string
}

export const Input: FC<InputProps> = ({ required = false, type = "text", autoComplete = "off", value = "", onChange, placeholder, maxLength = 32, className }) => {
	return (
		<div className={`relative w-100 ${className}`}>
			<input
				required={required}
				type={type}
				autoComplete={autoComplete}
				value={value}
				onChange={onChange}
				maxLength={maxLength}
				className="w-100 padd-md fs-md family1 color-text border-1px-text border-color-text bold bg-bg radius-sm input-focus outline-none transition"
			/>

			<label className={`pe-none absolute left-md padd-xs family1 fs-md color-text ${placeholder ? "bg-bg" : "bg-none"} translateY-label transition`}>{placeholder}</label>
			<span className="pe-none absolute right-md bottom-0 padd-xs family1 fs-sm color-text bg-bg translateY-span transition">
				{value.toString().length} / {maxLength}
			</span>
		</div>
	)
}
