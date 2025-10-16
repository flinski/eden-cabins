import { useForm, type SubmitHandler } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCabin, type NewCabin } from '@/services/apiCabins'
import toast from 'react-hot-toast'

type CabinData = {
	name: string
	maxCapacity: string
	regularPrice: string
	discount: string
	description: string
	// image: FileList | string
}

function cabinDataToNewCabin(data: CabinData): NewCabin {
	return {
		...data,
		maxCapacity: Number(data.maxCapacity),
		regularPrice: Number(data.regularPrice),
		discount: Number(data.discount),
	}
}

export default function CreateCabinTable() {
	const { register, handleSubmit, reset, getValues, formState } = useForm<CabinData>()
	const { errors } = formState

	const queryClient = useQueryClient()
	const { isPending: isCreating, mutate } = useMutation({
		mutationFn: createCabin,
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

	const onSubmit: SubmitHandler<CabinData> = (data) => {
		const newCabin = cabinDataToNewCabin(data)
		mutate(newCabin)
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="bg-ui-50 border-ui-200 flex flex-col rounded-lg border px-8 py-4"
		>
			<div className="not-last:border-b-ui-200 grid grid-cols-3 gap-6 py-5 not-last:border-b">
				<label htmlFor="name">Cabin name</label>
				<input
					type="text"
					id="name"
					{...register('name', {
						required: 'This field is required',
					})}
					className="border-ui-300 h-8 rounded-sm border-2 px-2"
				/>
				{errors?.name?.message && <span className="text-red-600">{errors.name.message}</span>}
			</div>
			<div className="not-last:border-b-ui-200 grid grid-cols-3 gap-6 py-5 not-last:border-b">
				<label htmlFor="maxCapacity">Maximum capacity</label>
				<input
					type="number"
					id="maxCapacity"
					{...register('maxCapacity', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Capacity should be at least 1',
						},
					})}
					className="border-ui-300 h-8 rounded-sm border-2 px-2"
				/>
				{errors?.maxCapacity?.message && (
					<span className="text-red-600">{errors.maxCapacity.message}</span>
				)}
			</div>
			<div className="not-last:border-b-ui-200 grid grid-cols-3 gap-6 py-5 not-last:border-b">
				<label htmlFor="regularPrice">Regular price</label>
				<input
					type="number"
					id="regularPrice"
					{...register('regularPrice', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Capacity should be at least 1',
						},
					})}
					className="border-ui-300 h-8 rounded-sm border-2 px-2"
				/>
				{errors?.regularPrice?.message && (
					<span className="text-red-600">{errors.regularPrice.message}</span>
				)}
			</div>
			<div className="not-last:border-b-ui-200 grid grid-cols-3 gap-6 py-5 not-last:border-b">
				<label htmlFor="discount">Discount</label>
				<input
					type="number"
					id="discount"
					{...register('discount', {
						required: 'This field is required',
						validate: (value) => {
							return Number(value) <= Number(getValues().regularPrice)
								? true
								: 'Discount should be less than regular price'
						},
					})}
					defaultValue={0}
					className="border-ui-300 h-8 rounded-sm border-2 px-2"
				/>
				{errors?.discount?.message && (
					<span className="text-red-600">{errors.discount.message}</span>
				)}
			</div>
			<div className="not-last:border-b-ui-200 grid grid-cols-3 gap-6 py-5 not-last:border-b">
				<label htmlFor="description">Description for website</label>
				<textarea
					id="description"
					{...register('description', {
						required: 'This field is required',
					})}
					defaultValue=""
					rows={4}
					className="border-ui-300 rounded-sm border-2 px-2"
				/>
				{errors?.description?.message && (
					<span className="text-red-600">{errors.description.message}</span>
				)}
			</div>
			<div className="not-last:border-b-ui-200 grid grid-cols-3 gap-6 py-5 not-last:border-b">
				<label htmlFor="image">Cabin photo</label>
				<input id="image" accept="image/*" className="border-ui-300 h-8 rounded-sm border-2 px-2" />
			</div>
			<div className="not-last:border-b-ui-200 flex items-center gap-4 self-end py-5 not-last:border-b">
				<button type="reset" className="bg-ui-200 cursor-pointer rounded-md px-3 py-2">
					Cancel
				</button>
				<button disabled={isCreating} className="bg-ui-200 cursor-pointer rounded-md px-3 py-2">
					Add cabin
				</button>
			</div>
		</form>
	)
}
