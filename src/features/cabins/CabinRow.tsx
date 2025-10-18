import { useState } from 'react'

import { type Cabin } from '@/services/apiCabins'
import { formatCurrency } from '@/lib/utils'
import { useDeleteCabin } from '@/features/cabins/useDeleteCabin'
import CreateCabinForm from '@/features/cabins/CreateCabinForm'

type CabinRowProps = {
	cabin: Cabin
}

export default function CabinRow({ cabin }: CabinRowProps) {
	const [showForm, setShowForm] = useState(false)
	const { isDeleting, deleteCabin } = useDeleteCabin()

	const { id, image, description, name, maxCapacity, regularPrice, discount } = cabin

	return (
		<>
			<div className="not-last:border-b-ui-200 grid grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr] items-center gap-6 p-2 not-last:border-b">
				<div className="width-full relative aspect-[16/10] overflow-hidden rounded-sm">
					<img src={image} alt={description} className="absolute top-0 left-0 size-full" />
				</div>
				<div>{name}</div>
				<div>{maxCapacity} guests</div>
				<div className="font-semibold">{formatCurrency(regularPrice)}</div>
				{discount > 0 ? (
					<div className="text-accent-600 font-semibold">{formatCurrency(discount)}</div>
				) : (
					'–'
				)}
				<div>
					<button
						onClick={() => setShowForm(!showForm)}
						disabled={isDeleting}
						className="bg-ui-200 cursor-pointer rounded-sm px-3 py-1 font-semibold hover:bg-amber-100 hover:text-amber-600 disabled:opacity-50"
					>
						Edit
					</button>
					<button
						onClick={() => deleteCabin(id)}
						disabled={isDeleting}
						className="bg-ui-200 cursor-pointer rounded-sm px-3 py-1 font-semibold hover:bg-red-100 hover:text-red-600 disabled:opacity-50"
					>
						Delete
					</button>
				</div>
			</div>
			{showForm && <CreateCabinForm cabinToEdit={cabin} />}
		</>
	)
}
