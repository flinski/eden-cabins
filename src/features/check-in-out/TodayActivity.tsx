import { useTodayActivity } from '@/features/check-in-out/useTodayActivity'
import TodayItem from '@/features/check-in-out/TodayItem'
import Spinner from '@/ui/Spinner'

export default function TodayActivity() {
	const { isLoading, activities } = useTodayActivity()

	return (
		<div className="bg-ui-50 border-ui-200 col-[1/span_2] flex flex-col gap-5 rounded-lg border p-6">
			<h2 className="text-h3 leading-heading font-semibold">Today activity</h2>

			{isLoading ? (
				<div className="flex items-center justify-center">
					<Spinner />
				</div>
			) : activities && activities.length > 0 ? (
				<ul className="flex flex-col">
					{activities.map((activity) => (
						<TodayItem activity={activity} key={activity.id} />
					))}
				</ul>
			) : (
				<div className="text-center">No activity today...</div>
			)}
		</div>
	)
}
