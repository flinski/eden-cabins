import { useForm, type SubmitHandler } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEditCabin, type Cabin, type NewCabin } from '@/services/apiCabins'
import toast from 'react-hot-toast'

import FormRow from '@/ui/FormRow'
import Input from '@/ui/Input'
import Textarea from '@/ui/Textarea'
import FileInput from '@/ui/FileInput'

type CabinData = {
	name: string
	maxCapacity: string
	regularPrice: string
	discount: string
	description: string
	image: FileList | string
}

function cabinDataToNewCabin(data: CabinData): NewCabin {
	return {
		...data,
		maxCapacity: Number(data.maxCapacity),
		regularPrice: Number(data.regularPrice),
		discount: Number(data.discount),
		image: typeof data.image === 'string' ? data.image : data.image[0],
	}
}

function cabinToCabinData(cabin: Cabin) {
	return {
		name: cabin.name,
		maxCapacity: String(cabin.maxCapacity),
		regularPrice: String(cabin.regularPrice),
		discount: String(cabin.discount),
		description: cabin.description,
		image: cabin.image,
	}
}

type CreateCabinFormProps = {
	cabinToEdit?: Cabin
}

export default function CreateCabinForm({ cabinToEdit }: CreateCabinFormProps) {
	const isEditSession = Boolean(cabinToEdit)
	const cabinData = isEditSession ? cabinToCabinData(cabinToEdit as Cabin) : null

	const { register, handleSubmit, reset, getValues, formState } = useForm<CabinData>({
		defaultValues: isEditSession ? (cabinData as CabinData) : {},
	})
	const { errors } = formState

	const queryClient = useQueryClient()
	const { isPending: isCreating, mutate: createCabin } = useMutation({
		mutationFn: (newCabin: NewCabin) => createEditCabin(newCabin),
		onSuccess: () => {
			toast.success('New cabin successfully created')
			queryClient.invalidateQueries({ queryKey: ['cabins'] })
			reset()
		},
		onError: (error) => {
			console.error(error.message)
			toast.error(error.message)
		},
	})
	const { isPending: isEditing, mutate: editCabin } = useMutation({
		mutationFn: ({ newCabin, id }: { newCabin: NewCabin; id: string | undefined }) =>
			createEditCabin(newCabin, id),
		onSuccess: () => {
			toast.success('Cabin successfully edited')
			queryClient.invalidateQueries({ queryKey: ['cabins'] })
			reset()
		},
		onError: (error) => {
			console.error(error.message)
			toast.error(error.message)
		},
	})

	const isWorking = isCreating || isEditing

	const onSubmit: SubmitHandler<CabinData> = (data) => {
		console.log(data)
		const newCabin = cabinDataToNewCabin(data)

		if (isEditSession) {
			editCabin({ newCabin, id: cabinToEdit!.id })
		} else {
			createCabin(newCabin)
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="bg-ui-50 border-ui-200 flex flex-col rounded-lg border px-8 py-4"
		>
			<FormRow id="name" label="Cabin name" errors={errors}>
				<Input
					type="text"
					id="name"
					disabled={isWorking}
					{...register('name', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow id="maxCapacity" label="Maximum capacity" errors={errors}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isWorking}
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
					disabled={isWorking}
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
					disabled={isWorking}
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
					disabled={isWorking}
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
					disabled={isWorking}
					{...register('image', {
						required: isEditSession ? false : 'This field is required',
					})}
				/>
			</FormRow>

			<div className="not-last:border-b-ui-200 flex items-center gap-4 self-end py-5 not-last:border-b">
				<button
					type="reset"
					disabled={isWorking}
					className="bg-ui-200 cursor-pointer rounded-md px-3 py-2 disabled:cursor-default disabled:opacity-50"
				>
					Cancel
				</button>
				<button
					disabled={isWorking}
					className="bg-ui-200 cursor-pointer rounded-md px-3 py-2 disabled:cursor-default disabled:opacity-50"
				>
					{isEditSession ? 'Edit cabin' : 'Create new cabin'}
				</button>
			</div>
		</form>
	)
}
