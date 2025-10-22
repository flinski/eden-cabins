import CabinTable from '@/features/cabins/CabinTable'
import AddCabin from '@/features/cabins/AddCabin'
import CabinTableOperations from '@/features/cabins/CabinTableOperations'

export default function Cabins() {
	return (
		<>
			<div className="flex flex-col gap-8">
				<div className="flex items-center justify-between">
					<h1 className="text-h1 leading-heading font-semibold">All cabins</h1>
					<CabinTableOperations />
				</div>
				<CabinTable />
				<AddCabin />
			</div>
		</>
	)
}
