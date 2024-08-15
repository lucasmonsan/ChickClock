import { ChangeEvent, FC } from "react"

interface DropdownProps {
	required?: boolean
	type?: string
	autoComplete?: string
	value: string | number | readonly string[]
	onChange: (event: ChangeEvent<HTMLSelectElement>) => void
	placeholder?: string
	options: number[]
	className?: string
}

export const Dropdown: FC<DropdownProps> = ({ value = "", onChange, placeholder, options, className }) => {
	// Função para mapear números aos nomes dos meses
	const getMonthName = (option: number): string => {
		const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
		return months[option - 1] || option.toString()
	}

	return (
		<div className={`relative ${className}`}>
			<select
				value={value}
				onChange={onChange}
				className={`appearance-none text-center w-100 padd-md fs-lg family1 color-text border-1px-text border-color-text bold bg-bg radius-sm input-focus outline-none resize-none transition`}
			>
				{options.map((option, index) => (
					<option key={index} value={option} className="family1">
						{placeholder === "Mês" ? getMonthName(option) : option}
					</option>
				))}
			</select>

			<label className={`pe-none absolute left-md padd-xs family1 fs-md color-text bg-bg translateY-label transition`}>{placeholder}</label>
		</div>
	)
}
