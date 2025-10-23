import BookingTable from '@/features/bookings/BookingTable'
import BookingTableOperations from '@/features/bookings/BookingTableOperations'

export default function Bookings() {
	return (
		<>
			<div className="flex flex-col gap-8">
				<div className="flex items-center justify-between">
					<h1 className="text-h1 leading-heading font-semibold">All bookings</h1>
					<BookingTableOperations />
				</div>
				<BookingTable />
			</div>
		</>
	)
}
