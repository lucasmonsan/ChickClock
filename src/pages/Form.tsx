import { FC, FormEvent, useEffect, useMemo, useState } from "react"
import { Input } from "../components/Input"
import { Dropdown } from "../components/Dropdown"
import { Button } from "../components/Button"
import { CheckIcon, ClipboardIcon } from "../assets/Icons"

interface FormProps {
	currentScreen: string
	autoComplete?: string
	className?: string
}

export const Form: FC<FormProps> = ({ currentScreen }) => {
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")

	const arrayYear = useMemo(() => Array.from({ length: 101 }, (_, i) => new Date().getFullYear() + i), [])
	const [arrayMonth, setArrayMonth] = useState([0])
	const [arrayDays, setArrayDays] = useState([0])

	const [year, setYear] = useState(new Date().getFullYear())
	const [month, setMonth] = useState(new Date().getMonth() + 1)
	const [day, setDay] = useState(new Date().getDate())

	const arrayHours = useMemo(() => Array.from({ length: 24 }, (_, i) => i), [])
	const [arrayMinutes, setArrayMinutes] = useState(Array.from({ length: 60 }, (_, i) => i))

	const [hour, setHour] = useState(new Date().getHours())
	const [minute, setMinute] = useState(new Date().getMinutes())

	const [link, setLink] = useState("")
	const [copied, setCopied] = useState(false)

	useEffect(() => {
		const form = document.getElementById("Form")
		if (!form) return

		if (currentScreen === "form") {
			form.style.opacity = "1"
			form.style.display = "flex"
		} else {
			form.style.opacity = "0"
			setTimeout(() => (form.style.display = "none"), 500)
		}
	}, [currentScreen])

	useEffect(() => {
		const daysInMonth = new Date(year, month, 0).getDate()

		if (year === new Date().getFullYear()) {
			const months = Array.from({ length: 12 - new Date().getMonth() }, (_, i) => new Date().getMonth() + 1 + i)
			setArrayMonth(months)

			if (month === new Date().getMonth() + 1) {
				const days = Array.from({ length: daysInMonth - new Date().getDate() + 1 }, (_, i) => new Date().getDate() + i)
				setArrayDays(days)

				if (day < new Date().getDate() || day > daysInMonth) {
					setDay(new Date().getDate())
				}
			} else {
				setArrayDays(Array.from({ length: daysInMonth }, (_, i) => i + 1))
			}
		} else {
			setArrayMonth(Array.from({ length: 12 }, (_, i) => i + 1))
			setArrayDays(Array.from({ length: daysInMonth }, (_, i) => i + 1))
		}
	}, [year, month])

	useEffect(() => {
		if (year === new Date().getFullYear() && month === new Date().getMonth() + 1 && day === new Date().getDate()) {
			const availableHours = arrayHours.filter((h) => h >= new Date().getHours())
			const availableMinutes = arrayMinutes.filter((m) => (hour === new Date().getHours() ? m >= new Date().getMinutes() : true))

			setHour((prev) => (availableHours.includes(prev) ? prev : availableHours[0]))
			setMinute((prev) => (availableMinutes.includes(prev) ? prev : availableMinutes[0]))
			setArrayMinutes(availableMinutes)
		} else {
			setArrayMinutes(Array.from({ length: 60 }, (_, i) => i))
		}
	}, [year, month, day, hour])

	const filteredHours = arrayHours.filter((h) => (year === new Date().getFullYear() && month === new Date().getMonth() + 1 && day === new Date().getDate() ? h >= new Date().getHours() : true))

	const filteredMinutes = arrayMinutes.filter((m) =>
		year === new Date().getFullYear() && month === new Date().getMonth() + 1 && day === new Date().getDate() && hour === new Date().getHours() ? m >= new Date().getMinutes() : true,
	)

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		if (title) {
			setLink(`chickclock.surge.sh?t=${title}&dd=${day}&mm=${month}&yyyy=${year}&hh=${hour}&mm=${minute}`)
		} else {
			alert("Por favor, preencha o título do timer")
		}
	}

	const copyLink = () => {
		if (navigator.clipboard) {
			navigator.clipboard
				.writeText(link)
				.then(() => {
					setCopied(true)
					setTimeout(() => setCopied(false), 1500)
				})
				.catch(() => {
					alert("Falha ao copiar o link.")
				})
		} else {
			const textArea = document.createElement("textarea")
			textArea.value = link
			document.body.appendChild(textArea)
			textArea.focus()
			textArea.select()
			try {
				document.execCommand("copy")
				setCopied(true)
				setTimeout(() => setCopied(false), 1500)
			} catch (err) {
				alert("Falha ao copiar o link.")
			}
			document.body.removeChild(textArea)
		}
	}

	return (
		<>
			<form id="Form" className="z-1 top-0 left-0 flex column ai-center jc-center gap-lg w-100 opacity-0 slow" style={{ backgroundColor: "var(--bg-color)" }} onSubmit={handleSubmit}>
				<h1 className="family1 color-text padd-xs">Novo Timer</h1>

				<Input placeholder="Nome" maxLength={40} value={title} onChange={(e) => setTitle(e.target.value)} />

				<div className="flex jc-center ai-center gap-md w-100">
					<Dropdown options={arrayDays} placeholder="Dia" value={day} onChange={(e) => setDay(Number(e.target.value))} className="w-20" />
					<Dropdown options={arrayMonth} placeholder="Mês" value={month} onChange={(e) => setMonth(Number(e.target.value))} className="w-50" />
					<Dropdown options={arrayYear} placeholder="Ano" value={year} onChange={(e) => setYear(Number(e.target.value))} className="w-30" />
				</div>

				<div className="flex jc-center ai-center gap-lg w-100">
					<Dropdown options={filteredHours} placeholder="Hora" value={hour} onChange={(e) => setHour(Number(e.target.value))} className="w-100" />
					<Dropdown options={filteredMinutes} placeholder="Minuto" value={minute} onChange={(e) => setMinute(Number(e.target.value))} className="w-100" />
				</div>

				<Button type="submit">Criar Timer</Button>
			</form>

			<div className={`w-100 padd-xs ${link !== "" ? "scale-1 opacity-1" : "scale-0 opacity-0"}`} />

			<div className={`flex column ai-center jc-center gap-md w-100 padd-md bg-text radius-sm slow ${link !== "" ? "scale-1 opacity-1" : "scale-0 opacity-0"}`}>
				<h1 className="family1 color-bg padd-xs" style={{ fontSize: "calc(var(--base) * 1.8)" }}>
					Link criado com sucesso!
				</h1>
				<div className={`flex ai-center jc-center gap-md w-100`}>
					<p id="Link" className={`w-100 fs-sm bold family1 color-bg break-all`}>
						{link}
					</p>
					<Button onClick={() => copyLink()} className="relative flex ai-center jc-center h-100" style={{ width: "3rem", height: "2.5rem" }}>
						<ClipboardIcon className={`absolute fast ${copied === true ? "scale-0 opacity-0" : "scale-1 opacity-1"}`} style={{ width: "1.5rem", height: "1.5rem" }} />
						<CheckIcon className={`absolute fast ${copied === true ? "scale-1 opacity-1" : "scale-0 opacity-0"}`} style={{ width: "2rem", height: "2rem" }} />
					</Button>
				</div>
			</div>
		</>
	)
}
