type ConfirmDeleteProps = {
	resourceName: string
	disabled: boolean
	onCloseModal?: () => void
	onConfirm: () => void
}

export default function ConfirmDelete({
	resourceName,
	disabled,
	onCloseModal,
	onConfirm,
}: ConfirmDeleteProps) {
	return (
		<div className="font-inter flex max-w-[480px] flex-col gap-3 p-4 font-medium">
			<h3 className="text-h3 font-semibold">Delete {resourceName}</h3>
			<p className="text-ui-600">
				Are you sure you want to delete this {resourceName} permanently? This action cannot be
				undone.
			</p>

			<div className="flex items-center gap-4 self-end">
				<button
					disabled={disabled}
					onClick={onCloseModal}
					className="border-ui-200 hover:bg-ui-100 cursor-pointer rounded-md border px-3 py-2 disabled:cursor-default disabled:opacity-50"
				>
					Cancel
				</button>
				<button
					disabled={disabled}
					onClick={onConfirm}
					className="text-ui-50 cursor-pointer rounded-md bg-red-600 px-3 py-2 hover:bg-red-500 disabled:cursor-default disabled:opacity-50"
				>
					Delete
				</button>
			</div>
		</div>
	)
}
