import { FC, ReactNode } from "react"

interface TextProps {
	children: ReactNode
	id?: string
	className?: string
	style?: object
}

export const H1: FC<TextProps> = ({ children, id, className, style }) => {
	return (
		<h1 id={id} className={`_family1 _lh-lg _fs-xl _color-text ${className}`} style={style}>
			{children}
		</h1>
	)
}

export const H2: FC<TextProps> = ({ children, className, style }) => {
	return (
		<h2 className={`_family1 _lh-md _fs-lg _color-text ${className}`} style={style}>
			{children}
		</h2>
	)
}

export const H3: FC<TextProps> = ({ children, className, style }) => {
	return (
		<h3 className={`_family1 _lh-sm _fs-md _color-text ${className}`} style={style}>
			{children}
		</h3>
	)
}

export const P1: FC<TextProps> = ({ children, className, style }) => {
	return (
		<p className={`_family2 _lh-lg _fs-md _bold _color-text ${className}`} style={style}>
			{children}
		</p>
	)
}

export const P2: FC<TextProps> = ({ children, className, style }) => {
	return (
		<p className={`_family2 _lh-sm _fs-sm _bold _color-text ${className}`} style={style}>
			{children}
		</p>
	)
}
