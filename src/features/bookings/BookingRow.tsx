import { format, isToday } from 'date-fns'

import { formatDistanceFromNow } from '@/lib/utils'
import type { Booking } from '@/services/apiBookings'
import Table from '@/ui/Table'
import Tag from '@/ui/Tag'

type BookingRowProps = {
	booking: Booking
}

export default function BookingRow({
	booking: {
		startDate,
		endDate,
		numNights,
		totalPrice,
		status,
		guests: { fullName: guestName, email },
		cabins: { name: cabinName },
	},
}: BookingRowProps) {
	const statusToTagName = {
		unconfirmed: 'blue',
		'checked-in': 'green',
		'checked-out': 'silver',
	} as const

	return (
		<Table.Row>
			<div className="pl-2">{cabinName}</div>

			<div className="flex flex-col">
				<span className="text-small">{guestName}</span>
				<span className="text-ui-400 text-sm font-normal">{email}</span>
			</div>

			<div className="flex flex-col">
				<span className="text-small">
					{isToday(new Date(startDate)) ? 'Today' : formatDistanceFromNow(startDate)} &rarr;{' '}
					{numNights} night stay
				</span>
				<span className="text-ui-400 text-sm font-normal">
					{format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
					{format(new Date(endDate), 'MMM dd yyyy')}
				</span>
			</div>

			<Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>

			<div>{totalPrice}</div>
		</Table.Row>
	)
}
