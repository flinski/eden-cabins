import CabinRow from '@/features/cabins/CabinRow'
import Spinner from '@/ui/Spinner'
import { useCabins } from './useCabins'

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
		<div className="bg-ui-50 border-ui-200 rounded-lg border">
			<header className="text-ui-700 border-ui-200 grid grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr] items-center gap-6 border-b px-2 py-4 font-semibold uppercase">
				<div></div>
				<div>Cabin</div>
				<div>Capacity</div>
				<div>Price</div>
				<div>Discount</div>
				<div></div>
			</header>
			{cabins?.map((cabin) => (
				<CabinRow key={cabin.id} cabin={cabin} />
			))}
		</div>
	)
}
