import { useForm, type SubmitHandler } from 'react-hook-form'

import { cabinDataToNewCabin, cabinToCabinData } from '@/lib/utils'
import { type Cabin } from '@/services/apiCabins'
import { useCreateCabin } from '@/features/cabins/useCreateCabin'
import { useEditCabin } from '@/features/cabins/useEditCabin'

import FormRow from '@/ui/FormRow'
import Input from '@/ui/Input'
import Textarea from '@/ui/Textarea'
import FileInput from '@/ui/FileInput'

export type CabinData = {
	name: string
	maxCapacity: string
	regularPrice: string
	discount: string
	description: string
	image: FileList | string
}

type CreateCabinFormProps = {
	cabinToEdit?: Cabin
	onCloseModal?: () => void
}

export default function CreateCabinForm({ cabinToEdit, onCloseModal }: CreateCabinFormProps) {
	const isEditSession = Boolean(cabinToEdit)
	const cabinData = isEditSession ? cabinToCabinData(cabinToEdit as Cabin) : null

	const { register, handleSubmit, getValues, reset, formState } = useForm<CabinData>({
		defaultValues: isEditSession ? (cabinData as CabinData) : {},
	})
	const { errors } = formState

	const { isCreating, createCabin } = useCreateCabin()
	const { isEditing, editCabin } = useEditCabin()
	const isCreatingOrEditing = isCreating || isEditing

	const onSubmit: SubmitHandler<CabinData> = (data) => {
		console.log(data)
		const newCabin = cabinDataToNewCabin(data)

		if (isEditSession) {
			editCabin(
				{ newCabin, id: cabinToEdit!.id },
				{
					onSuccess: () => {
						reset()
						onCloseModal?.()
					},
				}
			)
		} else {
			createCabin(newCabin, {
				onSuccess: () => {
					reset()
					onCloseModal?.()
				},
			})
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="bg-ui-50 font-inter flex flex-col rounded-lg px-8 py-4 font-medium"
		>
			<FormRow id="name" label="Cabin name" errors={errors}>
				<Input
					type="text"
					id="name"
					disabled={isCreatingOrEditing}
					{...register('name', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow id="maxCapacity" label="Maximum capacity" errors={errors}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isCreatingOrEditing}
					{...register('maxCapacity', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Capacity should be at least 1',
						},
					})}
				/>
			</FormRow>

			<FormRow id="regularPrice" label="Regular price" errors={errors}>
				<Input
					type="number"
					id="regularPrice"
					disabled={isCreatingOrEditing}
					{...register('regularPrice', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Regular price should be at least 1',
						},
					})}
				/>
			</FormRow>

			<FormRow id="discount" label="Discount" errors={errors}>
				<Input
					type="number"
					id="discount"
					defaultValue={0}
					disabled={isCreatingOrEditing}
					{...register('discount', {
						required: 'This field is required',
						validate: (value) => {
							return Number(value) <= Number(getValues().regularPrice)
								? true
								: 'Discount should be less than regular price'
						},
					})}
				/>
			</FormRow>

			<FormRow id="description" label="Description for website" errors={errors}>
				<Textarea
					id="description"
					defaultValue=""
					rows={4}
					disabled={isCreatingOrEditing}
					{...register('description', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow id="image" label="Cabin photo" errors={errors}>
				<FileInput
					type="file"
					id="image"
					accept="image/*"
					disabled={isCreatingOrEditing}
					{...register('image', {
						required: isEditSession ? false : 'This field is required',
					})}
				/>
			</FormRow>

			<div className="not-last:border-b-ui-200 flex items-center gap-4 self-end py-5 not-last:border-b">
				<button
					type="reset"
					disabled={isCreatingOrEditing}
					onClick={() => onCloseModal?.()}
					className="border-ui-200 hover:bg-ui-100 cursor-pointer rounded-md border bg-transparent px-3 py-2 disabled:cursor-default disabled:opacity-50"
				>
					Cancel
				</button>
				<button
					disabled={isCreatingOrEditing}
					className="bg-accent-600 text-ui-50 hover:bg-accent-700 cursor-pointer rounded-md px-3 py-2 disabled:cursor-default disabled:opacity-50"
				>
					{isEditSession ? 'Edit cabin' : 'Create new cabin'}
				</button>
			</div>
		</form>
	)
}
