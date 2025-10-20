import CabinRow from '@/features/cabins/CabinRow'
import { useCabins } from '@/features/cabins/useCabins'
import Spinner from '@/ui/Spinner'
import Table from '@/ui/Table'

export default function CabinTable() {
	const { isLoading, error, cabins } = useCabins()

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

	return (
		<Table columns="grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr]">
			<Table.Header>
				<div></div>
				<div>Cabin</div>
				<div>Capacity</div>
				<div>Price</div>
				<div>Discount</div>
				<div></div>
			</Table.Header>
			{cabins && (
				<Table.Body data={cabins} render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />} />
			)}
		</Table>
	)
}
