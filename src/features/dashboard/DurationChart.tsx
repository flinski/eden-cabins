import { PieChart, Pie, ResponsiveContainer, Cell, Legend, Tooltip } from 'recharts'
import type { BookingDetail } from '@/services/apiBookings'

const startData = [
	{
		duration: '1 night',
		value: 0,
		color: 'var(--color-red-600)',
	},
	{
		duration: '2 nights',
		value: 0,
		color: 'var(--color-amber-600)',
	},
	{
		duration: '3 nights',
		value: 0,
		color: 'var(--color-yellow-600)',
	},
	{
		duration: '4-5 nights',
		value: 0,
		color: 'var(--color-green-600)',
	},
	{
		duration: '6-7 nights',
		value: 0,
		color: 'var(--color-emerald-600)',
	},
	{
		duration: '8-14 nights',
		value: 0,
		color: 'var(--color-cyan-600)',
	},
	{
		duration: '15-21 nights',
		value: 0,
		color: 'var(--color-sky-600)',
	},
	{
		duration: '21+ nights',
		value: 0,
		color: 'var(--color-purple-600)',
	},
]

function prepareData(
	startData: {
		duration: string
		value: number
		color: string
	}[],
	stays: BookingDetail[]
) {
	function incArrayValue(
		arr: {
			duration: string
			value: number
			color: string
		}[],
		field: string
	) {
		return arr.map((obj) => (obj.duration === field ? { ...obj, value: obj.value + 1 } : obj))
	}

	const data = stays
		.reduce((arr, cur) => {
			const num = cur.numNights
			if (num === 1) return incArrayValue(arr, '1 night')
			if (num === 2) return incArrayValue(arr, '2 nights')
			if (num === 3) return incArrayValue(arr, '3 nights')
			if ([4, 5].includes(num)) return incArrayValue(arr, '4-5 nights')
			if ([6, 7].includes(num)) return incArrayValue(arr, '6-7 nights')
			if (num >= 8 && num <= 14) return incArrayValue(arr, '8-14 nights')
			if (num >= 15 && num <= 21) return incArrayValue(arr, '15-21 nights')
			if (num >= 21) return incArrayValue(arr, '21+ nights')
			return arr
		}, startData)
		.filter((obj) => obj.value > 0)

	return data
}

type DurationChartProps = {
	confirmedStays: BookingDetail[]
}

export default function DurationChart({ confirmedStays }: DurationChartProps) {
	const data = prepareData(startData, confirmedStays)

	return (
		<div className="bg-ui-50 border-ui-200 col-[3/span_2] flex flex-col gap-5 rounded-lg border p-6">
			<h2 className="text-h3 leading-heading font-semibold">Stay duration summary</h2>
			<ResponsiveContainer width="100%" height={250}>
				<PieChart>
					<Pie
						data={data}
						nameKey="duration"
						dataKey="value"
						innerRadius={85}
						outerRadius={110}
						cx="40%"
						cy="50%"
						paddingAngle={3}
					>
						{data.map((entry) => (
							<Cell fill={entry.color} stroke={entry.color} key={entry.duration} />
						))}
					</Pie>
					<Tooltip />
					<Legend
						verticalAlign="middle"
						align="right"
						layout="vertical"
						iconSize={15}
						iconType="circle"
					/>
				</PieChart>
			</ResponsiveContainer>
		</div>
	)
}
