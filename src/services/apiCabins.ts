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

export async function getCabins() {
	const { data, error } = await supabase.from('cabins').select('*')

	if (error) {
		console.log(error.message)
		throw new Error('Cabins could not be loaded')
	}

	const cabins: Cabin[] = data

	return cabins
}
