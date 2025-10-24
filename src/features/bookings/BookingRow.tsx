import { useNavigate } from 'react-router'
import { format, isToday } from 'date-fns'
import { Eye, Trash2, UserRoundCheck } from 'lucide-react'

import { formatCurrency, formatDistanceFromNow } from '@/lib/utils'
import type { Booking } from '@/services/apiBookings'
import Table from '@/ui/Table'
import Tag from '@/ui/Tag'
import Menus from '@/ui/Menus'

type BookingRowProps = {
	booking: Booking
}

export default function BookingRow({
	booking: {
		id: bookingId,
		startDate,
		endDate,
		numNights,
		totalPrice,
		status,
		guests: { fullName: guestName, email },
		cabins: { name: cabinName },
	},
}: BookingRowProps) {
	const navigate = useNavigate()

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

			<div className="">{formatCurrency(totalPrice)}</div>

			<Menus.Menu>
				<Menus.Toggle id={bookingId} />

				<Menus.List id={bookingId}>
					<Menus.Button icon={Eye} onClick={() => navigate(`/bookings/${bookingId}`)}>
						See details
					</Menus.Button>

					{status === 'unconfirmed' && (
						<Menus.Button icon={UserRoundCheck} onClick={() => navigate(`/checkin/${bookingId}`)}>
							Check in
						</Menus.Button>
					)}

					<Menus.Button icon={Trash2} onClick={() => 1}>
						Delete booking
					</Menus.Button>
				</Menus.List>
			</Menus.Menu>
		</Table.Row>
	)
}
