import type { OperationsOption } from '@/features/cabins/CabinTableOperations'

type SelectProps = {
	options: OperationsOption[]
	value: string
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function Select({ options, value, onChange }: SelectProps) {
	return (
		<select
			value={value}
			onChange={onChange}
			className="bg-ui-50 border-ui-200 rounded-lg border px-2"
		>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	)
}
