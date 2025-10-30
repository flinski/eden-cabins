import type { BookingDetail } from '@/services/apiBookings'
import CheckoutButton from '@/ui/CheckoutButton'
import Tag from '@/ui/Tag'
import { Link } from 'react-router'

type TodayItemProps = {
	activity: BookingDetail
}

export default function TodayItem({ activity }: TodayItemProps) {
	const { id, status, guests, numNights } = activity

	return (
		<li className="border-b-ui-200 first:border-t-ui-200 grid grid-cols-[90px_32px_1fr_90px_100px] items-center gap-3 border-b py-2 first:border-t">
			{status === 'unconfirmed' && <Tag type="green">Arriving</Tag>}
			{status === 'checked-in' && <Tag type="blue">Departing</Tag>}
			<img
				src={guests.countryFlag}
				alt={`Flag of ${guests.countryFlag}`}
				className="h-auto w-6 rounded-sm"
			/>
			<div>{guests.fullName}</div>
			<div className="text-end">{numNights} nights</div>
			{status === 'unconfirmed' && (
				<Link
					to={`/checkin/${id}`}
					className="bg-accent-600 text-ui-50 hover:bg-accent-700 cursor-pointer rounded-sm px-2 py-1 text-center"
				>
					Check in
				</Link>
			)}
			{status === 'checked-in' && <CheckoutButton bookingId={id}>Check out</CheckoutButton>}
		</li>
	)
}
