import { ChangeEvent, FC } from "react"

interface TextAreaProps {
	required?: boolean
	type?: string
	autoComplete?: string
	value: string | number | readonly string[]
	onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
	placeholder?: string
	maxLength?: number
	className?: string
}

export const TextArea: FC<TextAreaProps> = ({ required = false, autoComplete = "off", value = "", onChange, placeholder, maxLength = 128, className }) => {
	return (
		<div className={`relative w-100 ${className}`}>
			<textarea
				required={required}
				autoComplete={autoComplete}
				value={value}
				onChange={onChange}
				className="w-100 padd-md fs-md color-text family1 border-1px-text border-color-text bold bg-bg radius-sm input-focus outline-none resize-none transition"
				rows={4}
				maxLength={maxLength}
			/>

			<label className={`pe-none absolute left-md padd-xs family1 fs-md color-text ${placeholder ? "bg-bg" : "bg-none"} translateY-label transition`}>{placeholder}</label>
			<span className="pe-none absolute right-md bottom-0 padd-xs family1 fs-sm color-text bg-bg translateY-span transition">
				{value.toString().length} / {maxLength}
			</span>
		</div>
	)
}
