import Modal from '@/ui/Modal'
import CreateCabinForm from '@/features/cabins/CreateCabinForm'

export default function AddCabin() {
	return (
		<Modal>
			<Modal.Open opens="cabin-form">
				<button className="bg-ui-50 border-ui-200 hover:bg-accent-100 hover:text-accent-700 hover:border-accent-200 cursor-pointer self-end rounded-md border px-3 py-2">
					Add new cabin
				</button>
			</Modal.Open>
			<Modal.Window name="cabin-form">
				<CreateCabinForm />
			</Modal.Window>
		</Modal>
	)
}

// export default function AddCabin() {
// 	const [isOpenModal, setIsOpenModal] = useState(false)

// 	return (
// 		<div>
// 			<button
// 				onClick={() => setIsOpenModal(!isOpenModal)}
// 				className="bg-ui-50 border-ui-200 hover:bg-accent-100 hover:text-accent-700 hover:border-accent-200 cursor-pointer self-end rounded-md border px-3 py-2"
// 			>
// 				Add new cabin
// 			</button>
// 			{isOpenModal && (
// 				<Modal onClose={() => setIsOpenModal(false)}>
// 					<CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
// 				</Modal>
// 			)}
// 		</div>
// 	)
// }
