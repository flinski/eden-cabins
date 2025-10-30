import { BriefcaseBusiness, CalendarRange, ChartNoAxesColumn, Coins } from 'lucide-react'
import Stat from './Stat'
import { formatCurrency } from '@/lib/utils'
import type { BookingDetail } from '@/services/apiBookings'

type StatsProps = {
	bookings: {
		created_at: string
		totalPrice: number
		extrasPrice: number
	}[]
	confirmedStays: BookingDetail[]
	numDays: number
	cabinCount: number
}

export default function Stats({ bookings, confirmedStays, numDays, cabinCount }: StatsProps) {
	const numBookings = bookings.length
	const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0)
	const checkings = confirmedStays.length
	const occupation =
		confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinCount)

	return (
		<>
			<Stat
				title="Bookings"
				value={numBookings}
				icon={BriefcaseBusiness}
				color="bg-blue-100 text-blue-900"
			/>
			<Stat
				title="Sales"
				value={formatCurrency(sales)}
				icon={Coins}
				color="bg-accent-100 text-accent-900"
			/>
			<Stat
				title="Check ins"
				value={checkings}
				icon={CalendarRange}
				color="bg-yellow-100 text-yellow-900"
			/>
			<Stat
				title="Occupancy rate"
				value={Math.round(occupation * 100) + '%'}
				icon={ChartNoAxesColumn}
				color="bg-red-100 text-red-900"
			/>
		</>
	)
}
