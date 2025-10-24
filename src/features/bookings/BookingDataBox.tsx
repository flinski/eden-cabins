import { formatCurrency, formatDistanceFromNow } from '@/lib/utils'
import type { BookingDetail } from '@/services/apiBookings'
import { format, isToday } from 'date-fns'
import { BedSingle, CircleCheck, CircleDollarSign, MessageCircleMore } from 'lucide-react'

type BookingDataBoxProps = {
	booking: BookingDetail
}

export default function BookingDataBox({ booking }: BookingDataBoxProps) {
	const {
		created_at,
		startDate,
		endDate,
		numNights,
		numGuests,
		cabinPrice,
		extrasPrice,
		totalPrice,
		hasBreakfast,
		observations,
		isPaid,
		guests: { fullName: guestName, email, countryFlag, nationalId },
		cabins: { name: cabinName },
	} = booking

	return (
		<div className="bg-ui-50 border-ui-200 overflow-hidden rounded-lg border">
			<header className="bg-accent-600 text-ui-50 flex items-center justify-between gap-4 p-4">
				<div className="flex items-center gap-2">
					<BedSingle size={24} />
					<p className="text-xl">
						{numNights} nights in Cabin <span className="font-semibold">{cabinName}</span>
					</p>
				</div>

				<p className="text-lg">
					{format(new Date(startDate), 'EEE, MMM dd yyyy')} (
					{isToday(new Date(startDate)) ? 'Today' : formatDistanceFromNow(startDate)}) &mdash;{' '}
					{format(new Date(endDate), 'EEE, MMM dd yyyy')}
				</p>
			</header>

			<section className="flex flex-col gap-6 px-4 py-6">
				<div className="flex items-center gap-4">
					{countryFlag && <img src={countryFlag} alt="flag" className="h-auto w-8 rounded-sm" />}
					<p>
						{guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ''}
					</p>
					<span>&bull;</span>
					<p className="text-ui-500">{email}</p>
					<span>&bull;</span>
					<p className="text-ui-500">National Id: {nationalId}</p>
				</div>

				{observations && (
					<div className="flex items-center gap-3">
						<MessageCircleMore size={20} className="text-accent-600" />
						<span className="font-semibold">Observations</span>
						<span className="text-ui-600">{observations}</span>
					</div>
				)}

				<div className="flex items-center gap-3">
					<CircleCheck size={20} className="text-accent-600" />
					<span className="font-semibold">Breakfast included?</span>
					<span className="text-ui-600">{hasBreakfast ? 'Yes' : 'No'}</span>
				</div>

				<div className="bg-accent-100 flex items-center justify-between gap-3 rounded-lg p-8">
					<div className="flex items-center gap-4">
						<CircleDollarSign size={20} className="text-accent-700" />
						<span className="font-semibold">Total Price</span>
						{formatCurrency(totalPrice)}

						<span className="text-ui-500">
							{hasBreakfast &&
								` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(extrasPrice)} breakfast)`}
						</span>
					</div>

					<p className="uppercase">{isPaid ? 'Paid' : 'Will pay at property'}</p>
				</div>
			</section>

			<footer className="font- border-ui-200 flex items-center justify-end border-t p-4">
				<p className="text-ui-500 text-small">
					Booked {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}
				</p>
			</footer>
		</div>
	)
}
