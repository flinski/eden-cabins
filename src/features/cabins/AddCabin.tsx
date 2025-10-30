import Modal from '@/ui/Modal'
import CreateCabinForm from '@/features/cabins/CreateCabinForm'

export default function AddCabin() {
	return (
		<Modal>
			<Modal.Open opens="cabin-form">
				<button className="bg-accent-600 text-ui-50 hover:bg-accent-700 cursor-pointer self-end rounded-md px-3 py-2">
					Add new cabin
				</button>
			</Modal.Open>
			<Modal.Window name="cabin-form">
				<CreateCabinForm />
			</Modal.Window>
		</Modal>
	)
}
