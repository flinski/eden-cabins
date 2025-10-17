import type { FieldErrors } from 'react-hook-form'

type FormRowProps = {
	id: string
	label?: string
	children?: React.ReactNode
	errors?: FieldErrors
}

export default function FormRow({ children, id, errors, label }: FormRowProps) {
	return (
		<div className="not-last:border-b-ui-200 grid grid-cols-3 gap-6 py-5 not-last:border-b">
			<label htmlFor={id}>{label}</label>
			{children}
			{errors?.[id]?.message && (
				<span className="text-red-600">{errors[id].message as string}</span>
			)}
		</div>
	)
}
