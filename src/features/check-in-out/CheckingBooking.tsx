import { useEffect, useState } from 'react'

import { useMoveBack } from '@/hooks/useMoveBack'
import Spinner from '@/ui/Spinner'
import { useBooking } from '@/features/bookings/useBooking'
import BookingDataBox from '@/features/bookings/BookingDataBox'
import Tag from '@/ui/Tag'
import Checkbox from '@/ui/Checkbox'
import { formatCurrency } from '@/lib/utils'
import { useCheckin } from '@/features/check-in-out/useCheckin'
import { useSettings } from '@/features/settings/useSettings'

export default function CheckingBooking() {
	const [confirmPaid, setConfirmPaid] = useState(false)
	const [addBreakfast, setAddBreakfast] = useState(false)
	const moveBack = useMoveBack()
	const { isLoading, error, booking } = useBooking()
	const { isCheckingIn, checkin } = useCheckin()
	const { isLoading: isLoadingSettings, settings } = useSettings()

	useEffect(() => {
		setConfirmPaid(booking?.isPaid ?? false)
	}, [booking?.isPaid])

	if (isLoading || isLoadingSettings) {
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

	if (!settings) {
		return <div>Settings cound not be loaded</div>
	}

	const optionalBreakfastPrice = settings.breakfastPrice * booking.numGuests

	const status = booking.status

	const statusToTagName = {
		unconfirmed: 'blue',
		'checked-in': 'green',
		'checked-out': 'silver',
	} as const

	const handleCheckin = () => {
		if (!confirmPaid) {
			return
		}

		if (addBreakfast) {
			checkin({
				bookingId: booking.id,
				breakfast: {
					hasBreakfast: true,
					extrasPrice: optionalBreakfastPrice,
					totalPrice: booking.totalPrice + optionalBreakfastPrice,
				},
			})
		} else {
			checkin({ bookingId: booking.id })
		}
	}

	return (
		<div className="flex flex-col gap-5">
			<div className="flex items-center justify-between gap-6">
				<h1 className="text-h1 leading-heading font-semibold">Check in booking #{booking?.id}</h1>
				<Tag type={statusToTagName[status]}>{booking.status.replace('-', ' ')}</Tag>
			</div>

			<BookingDataBox booking={booking} />

			{!booking.hasBreakfast && (
				<div className="bg-ui-50 border-ui-200 rounded-lg border p-4">
					<Checkbox
						id="breakfast"
						checked={addBreakfast}
						onChange={() => {
							setAddBreakfast((add) => !add)
							setConfirmPaid(false)
						}}
					>
						Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
					</Checkbox>
				</div>
			)}

			<div className="bg-ui-50 border-ui-200 rounded-lg border p-4">
				<Checkbox
					id="confirm"
					checked={confirmPaid}
					disabled={confirmPaid || isCheckingIn}
					onChange={() => setConfirmPaid((confirm) => !confirm)}
				>
					I confirm that {booking.guests.fullName} has paid the total amount of{' '}
					{!addBreakfast
						? formatCurrency(booking.totalPrice)
						: `${formatCurrency(booking.totalPrice + optionalBreakfastPrice)}`}
				</Checkbox>
			</div>

			<div className="flex items-center justify-end gap-4">
				<button
					disabled={!confirmPaid || isCheckingIn}
					onClick={handleCheckin}
					className="bg-ui-50 border-ui-200 hover:bg-accent-600 hover:text-ui-50 disabled:hover:bg-ui-50 disabled:hover:text-ui-950 cursor-pointer self-end rounded-md border px-3 py-2 disabled:cursor-default disabled:opacity-50"
				>
					Check in booking
				</button>
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
