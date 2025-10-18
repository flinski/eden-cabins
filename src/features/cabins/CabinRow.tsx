import { useState } from 'react'
import { Copy, SquarePen, Trash2 } from 'lucide-react'

import { type Cabin } from '@/services/apiCabins'
import { formatCurrency } from '@/lib/utils'
import { useDeleteCabin } from '@/features/cabins/useDeleteCabin'
import CreateCabinForm from '@/features/cabins/CreateCabinForm'
import { useCreateCabin } from '@/features/cabins/useCreateCabin'

type CabinRowProps = {
	cabin: Cabin
}

export default function CabinRow({ cabin }: CabinRowProps) {
	const [showForm, setShowForm] = useState(false)
	const { isCreating, createCabin } = useCreateCabin()
	const { isDeleting, deleteCabin } = useDeleteCabin()
	const isCreatingOrDeleting = isCreating || isDeleting

	const { id, image, description, name, maxCapacity, regularPrice, discount } = cabin

	const handleDuplicate = () => {
		createCabin({
			name: `Copy of ${name}`,
			maxCapacity,
			regularPrice,
			discount,
			image,
			description,
		})
	}

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
				<div className="flex items-center justify-center gap-1">
					<button
						onClick={handleDuplicate}
						disabled={isCreatingOrDeleting}
						className="bg-ui-100 cursor-pointer rounded-sm p-2 font-semibold hover:bg-blue-100 hover:text-blue-600 disabled:opacity-50"
					>
						<Copy size={16} />
					</button>
					<button
						onClick={() => setShowForm(!showForm)}
						disabled={isCreatingOrDeleting}
						className="bg-ui-100 cursor-pointer rounded-sm p-2 font-semibold hover:bg-amber-100 hover:text-amber-600 disabled:opacity-50"
					>
						<SquarePen size={16} />
					</button>
					<button
						onClick={() => deleteCabin(id)}
						disabled={isCreatingOrDeleting}
						className="bg-ui-100 cursor-pointer rounded-sm p-2 font-semibold hover:bg-red-100 hover:text-red-600 disabled:opacity-50"
					>
						<Trash2 size={16} />
					</button>
				</div>
			</div>
			{showForm && <CreateCabinForm cabinToEdit={cabin} />}
		</>
	)
}
