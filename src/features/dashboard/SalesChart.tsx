import type { BookingShort } from '@/services/apiBookings'
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns'

import {
	AreaChart,
	Area,
	CartesianGrid,
	Tooltip,
	XAxis,
	YAxis,
	ResponsiveContainer,
} from 'recharts'

type SalesChartProps = {
	bookings: BookingShort[]
	numDays: number
}

export default function SalesChart({ bookings, numDays }: SalesChartProps) {
	const allDates = eachDayOfInterval({
		start: subDays(new Date(), numDays - 1),
		end: new Date(),
	})

	const data = allDates.map((date) => {
		return {
			label: format(date, 'MMM dd'),
			totalSales: bookings
				.filter((booking) => isSameDay(date, new Date(booking.created_at)))
				.reduce((acc, cur) => acc + cur.totalPrice, 0),
			extrasSales: bookings
				.filter((booking) => isSameDay(date, new Date(booking.created_at)))
				.reduce((acc, cur) => acc + cur.extrasPrice, 0),
		}
	})

	return (
		<div className="bg-ui-50 border-ui-200 col-span-full flex flex-col gap-5 rounded-lg border p-6">
			<h2 className="text-h3 leading-heading font-semibold">
				Sales from {format(allDates[0], 'MMM dd yyyy')} &mdash;{' '}
				{format(allDates[allDates.length - 1], 'MMM dd yyyy')}
			</h2>

			<ResponsiveContainer width="100%" height={300}>
				<AreaChart data={data}>
					<XAxis dataKey="label" />
					<YAxis unit="$" />
					<CartesianGrid strokeDasharray="4" />
					<Tooltip />
					<Area
						dataKey="totalSales"
						type="monotone"
						stroke="var(--color-accent-600)"
						fill="var(--color-accent-200)"
						name="Total sales"
						unit="$"
					/>
					<Area
						dataKey="extrasSales"
						type="monotone"
						stroke="var(--color-pink-600)"
						fill="var(--color-pink-200)"
						name="Extras sales"
						unit="$"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	)
}
