import supabase, { supabaseUrl } from '@/services/supabase'

export type Cabin = {
	id: string
	created_at: string
	name: string
	maxCapacity: number
	regularPrice: number
	discount: number
	description: string
	image: string
}

export type NewCabin = {
	name: string
	maxCapacity: number
	regularPrice: number
	discount: number
	description: string
	image: File | string
}

export async function getCabins() {
	const { data, error } = await supabase.from('cabins').select('*')

	if (error) {
		console.log(error.message)
		throw new Error('Cabins could not be loaded')
	}

	const cabins: Cabin[] = data

	return cabins
}

export async function createEditCabin(newCabin: NewCabin, id?: string) {
	const hasImagePath = typeof newCabin.image === 'string'
	const imageName =
		`${Math.random()}-${typeof newCabin.image === 'string' ? '' : newCabin.image.name}`.replaceAll(
			'/',
			''
		)
	const imagePath = hasImagePath
		? newCabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

	let query

	if (!id) {
		query = supabase.from('cabins').insert([{ ...newCabin, image: imagePath }])
	}

	if (id) {
		query = supabase
			.from('cabins')
			.update({ ...newCabin, image: imagePath })
			.eq('id', id)
	}

	// @ts-expect-error no undefined
	const { data, error } = await query.select().single()

	if (error) {
		console.log(error.message)
		throw new Error('Cabin could not be created')
	}

	const cabin: Cabin = data

	if (hasImagePath) {
		return cabin
	}

	const { error: storageError } = await supabase.storage
		.from('cabin-images')
		.upload(imageName, newCabin.image)

	if (storageError) {
		await supabase.from('cabins').delete().eq('id', cabin.id)
		console.log(storageError.message)
		throw new Error('Cabin image could not be uploaded and the cabin was not created')
	}

	return cabin
}

export async function deleteCabin(id: string) {
	const { error } = await supabase.from('cabins').delete().eq('id', id)

	if (error) {
		console.error(error.message)
		throw new Error('Cabin could not be deleted')
	}
}
