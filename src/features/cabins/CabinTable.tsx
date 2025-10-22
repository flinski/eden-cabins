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
				{filteredCabins && (
					<Table.Body
						data={filteredCabins}
						render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
					/>
				)}
			</Table>
		</Menus>
	)
}
