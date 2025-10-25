import { PAGE_SIZE } from '@/lib/constants'
import supabase from '@/services/supabase'

export type CabinDetail = {
	id: string
	created_at: string
	name: string
	maxCapacity: string
	regularPrice: number
	discount: number
	description: string
	image: string
}

export type GuestDetail = {
	id: string
	created_at: string
	fullName: string
	email: string
	nationalId: string
	nationality: string
	countryFlag: string
}

export type BookingDetail = {
	id: string
	created_at: string
	startDate: string
	endDate: string
	numNights: number
	numGuests: number
	cabinPrice: number
	extrasPrice: number
	totalPrice: number
	status: 'unconfirmed' | 'checked-in' | 'checked-out'
	hasBreakfast: boolean
	isPaid: boolean
	observations: string
	cabinId: string
	guestId: string

	cabins: CabinDetail
	guests: GuestDetail
}

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
	page: number
}

export async function getBookings({ filter, sortBy, page }: BookingsOptions) {
	let query = supabase
		.from('bookings')
		.select(
			'id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)',
			{ count: 'exact' }
		)

	if (filter) {
		// @ts-expect-error no error
		query[filter.method || 'eq'](filter.field, filter.value)
	}

	if (sortBy) {
		query = query.order(sortBy.field, { ascending: sortBy.direction === 'asc' })
	}

	if (page) {
		const from = (page - 1) * PAGE_SIZE
		const to = from + PAGE_SIZE - 1
		query = query.range(from, to)
	}

	const { data, error, count } = await query

	if (error) {
		console.error(error.message)
		throw new Error('Bookings could not be loaded')
	}

	// @ts-expect-error no error
	const bookings: Booking[] = data

	return { bookings, count }
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

	const booking: BookingDetail = data

	return booking
}

type UpdateBooking = {
	status: string
	isPaid?: boolean
}

export async function updateBooking(id: string, obj: UpdateBooking) {
	const { data, error } = await supabase.from('bookings').update(obj).eq('id', id).select().single()

	if (error) {
		console.error(error.message)
		throw new Error('Booking could not be updated')
	}

	const booking: BookingDetail = data

	return booking
}

export async function deleteBooking(id: string) {
	const { error } = await supabase.from('bookings').delete().eq('id', id)

	if (error) {
		console.error(error.message)
		throw new Error('Booking could not be deleted')
	}
}
