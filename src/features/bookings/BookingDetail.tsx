import { useNavigate } from 'react-router'

import { useMoveBack } from '@/hooks/useMoveBack'
import { useBooking } from '@/features/bookings/useBooking'
import BookingDataBox from '@/features/bookings/BookingDataBox'
import Tag from '@/ui/Tag'
import Spinner from '@/ui/Spinner'
import { useCheckout } from '@/features/check-in-out/useCheckout'

export default function BookingDetail() {
	const navigate = useNavigate()
	const moveBack = useMoveBack()
	const { isLoading, error, booking } = useBooking()
	const { isCheckingOut, checkout } = useCheckout()
	const status = booking?.status ?? 'unconfirmed'

	if (isLoading) {
		return (
			<div className="flex items-center justify-center">
				<Spinner />
			</div>
		)
	}

	if (error) {
		console.error(error.message)
		return <div>Booking cound not be loaded</div>
	}

	if (!booking) {
		return <div>Booking cound not be loaded</div>
	}

	const statusToTagName = {
		unconfirmed: 'blue',
		'checked-in': 'green',
		'checked-out': 'silver',
	} as const

	return (
		<div className="flex flex-col gap-8">
			<div className="flex items-center justify-between gap-6">
				<h1 className="text-h1 leading-heading font-semibold">Booking #{booking.id}</h1>
				<Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
			</div>

			<BookingDataBox booking={booking} />

			<div className="flex items-center justify-end gap-4">
				{status === 'unconfirmed' && (
					<button
						onClick={() => navigate(`/checkin/${booking?.id}`)}
						className="bg-ui-50 border-ui-200 hover:bg-accent-600 hover:text-ui-50 cursor-pointer self-end rounded-md border px-3 py-2"
					>
						Check in
					</button>
				)}

				{status === 'checked-in' && (
					<button
						disabled={isCheckingOut}
						onClick={() => checkout(booking.id)}
						className="bg-ui-50 border-ui-200 hover:bg-accent-600 hover:text-ui-50 cursor-pointer self-end rounded-md border px-3 py-2"
					>
						Check out
					</button>
				)}

				<button
					onClick={moveBack}
					className="bg-ui-50 border-ui-200 hover:bg-accent-600 hover:text-ui-50 cursor-pointer self-end rounded-md border px-3 py-2"
				>
					Back
				</button>
			</div>
		</div>
	)
}
