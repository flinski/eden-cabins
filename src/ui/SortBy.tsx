import { useSearchParams } from 'react-router'

import type { OperationsOption } from '@/features/cabins/CabinTableOperations'
import Select from '@/ui/Select'

type SortByProps = {
	options: OperationsOption[]
}

export default function SortBy({ options }: SortByProps) {
	const [searchParams, setSearchParams] = useSearchParams()
	const sortBy = searchParams.get('sortBy') ?? ''

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		searchParams.set('sortBy', e.target.value)
		setSearchParams(searchParams)
	}

	return <Select options={options} value={sortBy} onChange={handleChange} />
}
