import supabase from '@/services/supabase'

export type CabinName = {
	name: string
}

export type Guest = {
	// id: string
	// created_at: string
	fullName: string
	email: string
	// nationalId: string
	// nationality: string
	// countryFlag: string
}

export type Booking = {
	id: string
	created_at: string
	startDate: string
	endDate: string
	numNights: number
	numGuests: number
	// cabinPrice: number
	// extrasPrice: number
	totalPrice: number
	status: 'unconfirmed' | 'checked-in' | 'checked-out'
	// hasBreakfast: boolean
	// isPaid: boolean
	// observations: string
	// cabinId: string
	// guestId: string

	cabins: CabinName
	guests: Guest
}

export async function getBookings() {
	const { data, error } = await supabase
		.from('bookings')
		.select(
			'id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)'
		)
	console.log(data)
	if (error) {
		console.error(error.message)
		throw new Error('Bookings could not be loaded')
	}

	// @ts-expect-error no error
	const bookings: Booking[] = data

	return bookings
}

export async function getBooking(id: string) {
	const { data, error } = await supabase
		.from('bookings')
		.select('*, cabins(*), guests(*)')
		.eq('id', id)
		.single()

	if (error) {
		console.error(error.message)
		throw new Error('Booking not found')
	}

	const booking: Booking = data

	return booking
}
