import CabinTable from '@/features/cabins/CabinTable'

export default function Cabins() {
	return (
		<>
			<div className="mb-8 flex items-center justify-between">
				<h1 className="text-h1 leading-heading font-semibold">All cabins</h1>
				<p>Filter / Sort</p>
			</div>

			<CabinTable />
		</>
	)
}
