import { useState } from 'react'
import CabinTable from '@/features/cabins/CabinTable'
import CreateCabinTable from '@/features/cabins/CreateCabinTable'

export default function Cabins() {
	const [showForm, setShowForm] = useState(false)

	return (
		<>
			<div className="flex flex-col gap-8">
				<div className="flex items-center justify-between">
					<h1 className="text-h1 leading-heading font-semibold">All cabins</h1>
					<p>Filter / Sort</p>
				</div>
				<CabinTable />
				<button
					onClick={() => setShowForm(!showForm)}
					className="bg-ui-50 border-ui-200 hover:bg-accent-100 hover:text-accent-700 hover:border-accent-200 cursor-pointer self-end rounded-md border px-3 py-2"
				>
					Add new cabin
				</button>
				{showForm && <CreateCabinTable />}
			</div>
		</>
	)
}
