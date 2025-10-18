import supabase from '@/services/supabase'

type Settings = {
	id: string
	created_at: string
	minBookingLength: number
	maxBookingLength: number
	maxGuestsPerBooking: number
	breakfastPrice: number
}

export async function getSettings() {
	const { data, error } = await supabase.from('settings').select('*').single()

	if (error) {
		console.log(error.message)
		throw new Error('Settings could not be loaded')
	}

	const settings: Settings = data

	return settings
}

type NewSetting = {
	[key: string]: string
}

export async function updateSetting(newSetting: NewSetting) {
	const { data, error } = await supabase
		.from('settings')
		.update(newSetting)
		.eq('id', '04313c28-8925-4af0-8710-ce8f8fdc9e9e')
		.single()

	if (error) {
		console.log(error.message)
		throw new Error('Settings could not be loaded')
	}

	return data
}
