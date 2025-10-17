import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { deleteCabin, type Cabin } from '@/services/apiCabins'
import { formatCurrency } from '@/lib/utils'
import CreateCabinForm from '@/features/cabins/CreateCabinForm'

type CabinRowProps = {
	cabin: Cabin
}

export default function CabinRow({ cabin }: CabinRowProps) {
	const [showForm, setShowForm] = useState(false)

	const { id, image, description, name, maxCapacity, regularPrice, discount } = cabin

	const queryClient = useQueryClient()
	const { isPending, mutate } = useMutation({
		mutationFn: deleteCabin,
		onSuccess: () => {
			toast.success('Cabin successfully deleted')
			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			})
		},
		onError: (error) => {
			console.error(error.message)
			toast.error(error.message)
		},
	})

	return (
		<>
			<div className="not-last:border-b-ui-200 grid grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr] items-center gap-6 p-2 not-last:border-b">
				<div className="width-full relative aspect-[16/10] overflow-hidden rounded-sm">
					<img src={image} alt={description} className="absolute top-0 left-0 size-full" />
				</div>
				<div>{name}</div>
				<div>{maxCapacity} guests</div>
				<div className="font-semibold">{formatCurrency(regularPrice)}</div>
				<div className="text-accent-600 font-semibold">{formatCurrency(discount)}</div>
				<div>
					<button
						onClick={() => setShowForm(!showForm)}
						disabled={isPending}
						className="bg-ui-200 cursor-pointer rounded-sm px-3 py-1 font-semibold hover:bg-amber-100 hover:text-amber-600 disabled:opacity-50"
					>
						Edit
					</button>
					<button
						onClick={() => mutate(id)}
						disabled={isPending}
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
