import { ChangeEvent, FC, MouseEvent, ReactNode } from "react"
import { P2 } from "./Texts"

interface ImageProps {
	src: string
	alt: string
	className?: string
}
interface ButtonProps {
	variant?: string
	type?: "button" | "submit" | "reset"
	children?: string | ReactNode
	className?: string
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void
	style?: object
}
interface InputProps {
	variant?: string
	type?: string
	name?: string
	required?: boolean
	placeholder?: string
	disabled?: boolean
	value: string | number | readonly string[]
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
	className?: string
}
interface CheckboxProps {
	checked?: boolean
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void
	disabled?: boolean
	children?: ReactNode
	className?: string
}
interface DropdownProps {
	placeholder?: string
	disabled?: boolean
	value: string | number | readonly string[]
	onChange: (event: ChangeEvent<HTMLSelectElement>) => void
	className?: string
	options: string[]
}

export const Image: FC<ImageProps> = ({ className, src, alt }) => {
	return <img src={src} alt={alt} className={`_top-0 _left-0 _cover ${className}`} />
}
export const Button: FC<ButtonProps> = ({ variant, type = "button", onClick, className, children, style }) => {
	return variant === "transparent" ? (
		<button type={type} onClick={onClick} className={`_pointer _flex _ai-center _jc-center _padd-xs _radius-md _bg-none _border-none fast ${className}`} style={style}>
			{children}
		</button>
	) : variant === "opaque" ? (
		<button type={type} onClick={onClick} className={`_pointer _flex _ai-center _jc-center _h-xxl _padd-xl _radius-md _border-md _bg-comp _color-border fast ${className}`} style={style}>
			{children}
		</button>
	) : (
		<button type={type} onClick={onClick} className={`_pointer _flex _ai-center _jc-center _h-xxl _padd-xl _radius-md _bg-orange _border-none fast ${className}`} style={style}>
			{children}
		</button>
	)
}
export const Input: FC<InputProps> = ({ variant, type = "text", placeholder, required, disabled, value, onChange, className }) => {
	return variant === "currency" ? (
		<label
			className={`_relative _border-b-md _color-text _focus-color-orange _focus-top-0 _fast ${disabled === true ? "opacity-0125" : ""} ${className}`}
			style={{ maxHeight: "calc(var(--base) * 5)", minHeight: "calc(var(--base) * 5)" }}
		>
			<P2 className={`_absolute _top-lg  _semi-bold _fast ${value !== "" ? "top-0" : ""}`}>{placeholder}</P2>
			<div className="_absolute flex ai-end gap-xxs h-100">
				<strong className="family2">R$</strong>
				<input
					disabled={disabled}
					type={type}
					required={required}
					value={value}
					onChange={onChange}
					pattern="[0-9]*"
					inputMode="numeric"
					className={`_outline-none focus-border-none _bg-none _border-none _family2 _fs-xxl _h-xxl _bold _color-text w-100 _opacity-0 _normal _focus-opacity-1 ${value !== "" ? "opacity-1" : ""}`}
				/>
			</div>
		</label>
	) : (
		<label
			className={`_relative _border-b-md _color-text _focus-color-orange _focus-top-0 _fast ${disabled === true ? "_opacity-0125" : ""} ${className}`}
			style={{ maxHeight: "calc(var(--base) * 4)", minHeight: "calc(var(--base) * 4)" }}
		>
			<P2 className={`_absolute _top-lg  _semi-bold _fast ${value !== "" ? "top-xxs" : ""}`}>{placeholder}</P2>
			<input
				disabled={disabled}
				type={type}
				required={required}
				value={value}
				onChange={onChange}
				className={`_absolute top-lg outline-none bg-none _border-none _family2 lh-xs h-xl _fs-lg _bold _color-text w-100 _opacity-0 _normal _focus-opacity-1 ${value !== "" ? "opacity-1" : ""}`}
			/>
		</label>
	)
}
export const Checkbox: FC<CheckboxProps> = ({ checked = false, children, disabled, onChange, className }) => {
	return (
		<label className={`_pointer _flex _ai-center _jc-center _padd-md ${className}`}>
			<input type="checkbox" checked={checked} onChange={onChange} disabled={false} className="_display-none" />
			<svg viewBox="0 0 64 64" aria-checked={checked} aria-disabled={disabled} className="_overflow-visible _h-lg">
				<path
					d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
					pathLength="575.0541381835938"
					fill="none"
					stroke={disabled ? "var(--comp-color)" : "var(--text-color)"}
					strokeWidth={6}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeDasharray={checked ? "70.5096664428711 9999999" : "241 9999999"}
					strokeDashoffset={checked ? -262.2723388671875 : 0}
					className="_checkbox-animation"
				></path>
			</svg>
			{children}
		</label>
	)
}
export const Dropdown: FC<DropdownProps> = ({ placeholder, disabled, value, onChange, className, options }) => {
	return (
		<label
			className={`_relative _w-100 _border-b-md _color-text _focus-color-orange _focus-top-0 _fast ${disabled === true ? "_opacity-025" : ""} ${className}`}
			style={{ maxHeight: "48px", minHeight: "48px" }}
		>
			<P2 className={`_absolute top-xxs _semi-bold _fast`}>{placeholder}</P2>
			<div className="_absolute flex ai-end gap-xxs w-100 h-100">
				<select disabled={disabled} value={value} onChange={onChange} className="w-100 h-xl border-none bg-none color-text family2 fs-lg bold outline-none">
					{options.map((option, index) => (
						<option key={index} value={option}>
							{option}
						</option>
					))}
				</select>
			</div>
		</label>
	)
}
