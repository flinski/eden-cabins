import { Copy, SquarePen, Trash2 } from 'lucide-react'

import { type Cabin } from '@/services/apiCabins'
import { formatCurrency } from '@/lib/utils'
import { useDeleteCabin } from '@/features/cabins/useDeleteCabin'
import CreateCabinForm from '@/features/cabins/CreateCabinForm'
import { useCreateCabin } from '@/features/cabins/useCreateCabin'
import Modal from '@/ui/Modal'
import ConfirmDelete from '@/ui/ConfirmDelete'
import Table from '@/ui/Table'

type CabinRowProps = {
	cabin: Cabin
}

export default function CabinRow({ cabin }: CabinRowProps) {
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
		<Table.Row>
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
				<Modal>
					<Modal.Open opens="edit">
						<button
							disabled={isCreatingOrDeleting}
							className="bg-ui-100 cursor-pointer rounded-sm p-2 font-semibold hover:bg-amber-100 hover:text-amber-600 disabled:opacity-50"
						>
							<SquarePen size={16} />
						</button>
					</Modal.Open>
					<Modal.Window name="edit">
						<CreateCabinForm cabinToEdit={cabin} />
					</Modal.Window>
				</Modal>

				<Modal>
					<Modal.Open opens="delete">
						<button
							disabled={isCreatingOrDeleting}
							className="bg-ui-100 cursor-pointer rounded-sm p-2 font-semibold hover:bg-red-100 hover:text-red-600 disabled:opacity-50"
						>
							<Trash2 size={16} />
						</button>
					</Modal.Open>
					<Modal.Window name="delete">
						<ConfirmDelete
							resourceName="cabins"
							disabled={isCreatingOrDeleting}
							onConfirm={() => deleteCabin(id)}
						/>
					</Modal.Window>
				</Modal>
			</div>
		</Table.Row>
	)
}
