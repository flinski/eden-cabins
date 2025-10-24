type CheckboxProps = {
	children: React.ReactNode
	id: string
	checked: boolean
	disabled?: boolean
	onChange: () => void
}

export default function Checkbox({
	children,
	id,
	checked,
	disabled,

	onChange,
}: CheckboxProps) {
	return (
		<div className="flex items-center gap-3">
			<input
				type="checkbox"
				id={id}
				checked={checked}
				disabled={disabled}
				onChange={onChange}
				className="accent-accent-600 size-4"
			/>
			<label htmlFor={!disabled ? id : ''} className="">
				{children}
			</label>
		</div>
	)
}
