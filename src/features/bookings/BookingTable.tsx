import type { Booking } from '@/services/apiBookings'
import { useBookings } from '@/features/bookings/useBookings'
import BookingRow from '@/features/bookings/BookingRow'
import Menus from '@/ui/Menus'
import Table from '@/ui/Table'
import Spinner from '@/ui/Spinner'
import Pagination from '@/ui/Pagination'

export default function BookingTable() {
	const { isLoading, error, data } = useBookings()

	if (isLoading) {
		return (
			<div className="flex items-center justify-center">
				<Spinner />
			</div>
		)
	}

	if (error) {
		console.error(error.message)
		return <div>Bookings cound not be loaded</div>
	}

	if (data === undefined) {
		return <div>Bookings cound not be loaded</div>
	}

	const { bookings, count } = data

	return (
		<Menus>
			<Table columns="grid-cols-[0.6fr_2fr_2.4fr_1.4fr_1fr_3.2rem]">
				<Table.Header>
					<div className="pl-2">Cabin</div>
					<div>Guest</div>
					<div>Dates</div>
					<div>Status</div>
					<div>Amount</div>
					<div></div>
				</Table.Header>

				{bookings && (
					<Table.Body
						data={bookings}
						render={(booking) => <BookingRow key={booking.id} booking={booking as Booking} />}
					/>
				)}

				<Table.Footer>
					<Pagination count={count ? count : 0} />
				</Table.Footer>
			</Table>
		</Menus>
	)
}
