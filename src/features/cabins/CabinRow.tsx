import { Copy, SquarePen, Trash2 } from 'lucide-react'

import { type Cabin } from '@/services/apiCabins'
import { formatCurrency } from '@/lib/utils'
import { useDeleteCabin } from '@/features/cabins/useDeleteCabin'
import CreateCabinForm from '@/features/cabins/CreateCabinForm'
import { useCreateCabin } from '@/features/cabins/useCreateCabin'
import Modal from '@/ui/Modal'
import ConfirmDelete from '@/ui/ConfirmDelete'
import Table from '@/ui/Table'
import Menus from '@/ui/Menus'

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
			<div className="flex items-center justify-end gap-1 pr-2">
				<Modal>
					<Menus.Menu>
						<Menus.Toggle id={id} />

						<Menus.List id={id}>
							<Menus.Button icon={Copy} onClick={handleDuplicate}>
								Duplicate
							</Menus.Button>

							<Modal.Open opens="edit">
								<Menus.Button icon={SquarePen}>Edit</Menus.Button>
							</Modal.Open>

							<Modal.Open opens="delete">
								<Menus.Button icon={Trash2}>Delete</Menus.Button>
							</Modal.Open>
						</Menus.List>

						<Modal.Window name="edit">
							<CreateCabinForm cabinToEdit={cabin} />
						</Modal.Window>

						<Modal.Window name="delete">
							<ConfirmDelete
								resourceName="cabins"
								disabled={isCreatingOrDeleting}
								onConfirm={() => deleteCabin(id)}
							/>
						</Modal.Window>
					</Menus.Menu>
				</Modal>
			</div>
		</Table.Row>
	)
}
