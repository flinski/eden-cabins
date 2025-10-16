import supabase from '@/services/supabase'

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
	// image: File | string
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

export async function createCabin(newCabin: NewCabin) {
	const { data, error } = await supabase.from('cabins').insert([newCabin]).select()

	if (error) {
		console.log(error.message)
		throw new Error('Cabin could not be created')
	}

	const cabins: Cabin[] = data

	return cabins
}

export async function deleteCabin(id: string) {
	const { error } = await supabase.from('cabins').delete().eq('id', id)

	if (error) {
		console.error(error.message)
		throw new Error('Cabin could not be deleted')
	}
}
