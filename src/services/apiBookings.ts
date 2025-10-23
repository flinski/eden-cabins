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

type BookingsFilter = {
	field: string
	value: string
	method?: string
}

type BookingsSortBy = {
	field: string
	direction: string
}

type BookingsOptions = {
	filter: BookingsFilter | null
	sortBy: BookingsSortBy
}

export async function getBookings({ filter, sortBy }: BookingsOptions) {
	let query = supabase
		.from('bookings')
		.select(
			'id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)'
		)

	if (filter) {
		// @ts-expect-error no error
		query[filter.method || 'eq'](filter.field, filter.value)
	}

	if (sortBy) {
		query = query.order(sortBy.field, { ascending: sortBy.direction === 'asc' })
	}

	const { data, error } = await query

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
