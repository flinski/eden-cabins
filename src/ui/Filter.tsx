import type { OperationsOption } from '@/features/cabins/CabinTableOperations'
import { cn } from '@/lib/utils'
import { useSearchParams } from 'react-router'

type FilterButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	children?: React.ReactNode
	className?: string
	active: boolean
}

function FilterButton({ children, className, active, ...props }: FilterButtonProps) {
	return (
		<button
			{...props}
			className={cn(
				'hover:bg-accent-600 hover:text-ui-50 inline-flex cursor-pointer items-center justify-center rounded-md px-2 py-1 disabled:cursor-default',
				active && 'bg-accent-600 text-ui-50',
				className
			)}
		>
			{children}
		</button>
	)
}

type FilterProps = {
	filterField: string
	options: OperationsOption[]
}

export default function Filter({ filterField, options }: FilterProps) {
	const [searchParams, setSearchParams] = useSearchParams()
	const currentFilter = searchParams.get(filterField) ?? options[0].value

	const handleClick = (urlValue: string) => {
		searchParams.set(filterField, urlValue)
		if (searchParams.get('page')) {
			searchParams.set('page', '1')
		}
		setSearchParams(searchParams)
	}

	return (
		<div className="bg-ui-50 border-ui-200 flex items-center gap-1 rounded-lg border p-1">
			{options.map((option) => (
				<FilterButton
					key={option.value}
					active={option.value === currentFilter}
					disabled={option.value === currentFilter}
					onClick={() => handleClick(option.value)}
				>
					{option.label}
				</FilterButton>
			))}
		</div>
	)
}
