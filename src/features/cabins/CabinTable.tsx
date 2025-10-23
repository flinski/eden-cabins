import { useSearchParams } from 'react-router'

import CabinRow from '@/features/cabins/CabinRow'
import { useCabins } from '@/features/cabins/useCabins'
import Menus from '@/ui/Menus'
import Spinner from '@/ui/Spinner'
import Table from '@/ui/Table'
import type { Cabin } from '@/services/apiCabins'

type DiscountFilter = 'all' | 'no-discount' | 'with-discount'

export default function CabinTable() {
	const { isLoading, error, cabins } = useCabins()
	const [searchParams] = useSearchParams()

	if (isLoading) {
		return (
			<div className="flex items-center justify-center">
				<Spinner />
			</div>
		)
	}

	if (error) {
		console.error(error.message)
		return <div>Cabins cound not be loaded</div>
	}

	const filterMap: Record<DiscountFilter, (cabin: Cabin) => boolean> = {
		all: () => true,
		'no-discount': (cabin: Cabin) => cabin.discount <= 0,
		'with-discount': (cabin: Cabin) => cabin.discount > 0,
	}
	const filterValue = (searchParams.get('discount') ?? 'all') as DiscountFilter
	const filteredCabins = cabins?.filter(filterMap[filterValue])

	const sortBy = searchParams.get('sortBy') || 'startDate-asc'
	const [field, direction] = sortBy.split('-')
	const modifier = direction === 'asc' ? 1 : -1
	// @ts-expect-error no error
	const sortedCabins = filteredCabins?.sort((a, b) => (a[field] - b[field]) * modifier)

	return (
		<Menus>
			<Table columns="grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr]">
				<Table.Header>
					<div></div>
					<div>Cabin</div>
					<div>Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>
				{sortedCabins && (
					<Table.Body
						data={sortedCabins}
						render={(cabin) => <CabinRow key={cabin.id} cabin={cabin as Cabin} />}
					/>
				)}
			</Table>
		</Menus>
	)
}
