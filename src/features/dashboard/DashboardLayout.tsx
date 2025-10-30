import { useCabins } from '@/features/cabins/useCabins'
import TodayActivity from '@/features/check-in-out/TodayActivity'
import { useRecentBookings } from '@/features/dashboard/useRecentBookings'
import { useRecentStays } from '@/features/dashboard/useRecentStays'
import Stats from '@/features/dashboard/Stats'
import SalesChart from '@/features/dashboard/SalesChart'
import DurationChart from '@/features/dashboard/DurationChart'
import Spinner from '@/ui/Spinner'

export default function DashboardLayout() {
	const { isLoading: isLoadingBookings, bookings } = useRecentBookings()
	const { isLoading: isLoadingStays, stays, confirmedStays, numDays } = useRecentStays()
	const { cabins, isLoading: isLoadingCabins } = useCabins()
	const isLoading = isLoadingBookings || isLoadingStays || isLoadingCabins

	if (isLoading) {
		return (
			<div className="flex items-center justify-center">
				<Spinner />
			</div>
		)
	}

	if (
		bookings === undefined ||
		stays === undefined ||
		confirmedStays === undefined ||
		cabins === undefined
	) {
		return <div>Data cound not be loaded</div>
	}

	return (
		<div className="grid grid-cols-4 grid-rows-[auto_auto_auto] gap-9">
			<Stats
				bookings={bookings}
				confirmedStays={confirmedStays}
				numDays={numDays}
				cabinCount={cabins?.length}
			/>
			<TodayActivity />
			<DurationChart confirmedStays={confirmedStays} />
			<SalesChart bookings={bookings} numDays={numDays} />
		</div>
	)
}
