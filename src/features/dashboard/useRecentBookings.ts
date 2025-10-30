import { getBookingsAfterDate } from '@/services/apiBookings'
import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useSearchParams } from 'react-router'

export function useRecentBookings() {
	const [searchParams] = useSearchParams()

	const numDays = !searchParams.get('last') ? 7 : Number(searchParams.get('last'))

	const { data: bookings, isPending: isLoading } = useQuery({
		queryFn: () => {
			const queryDate = subDays(new Date(), numDays).toISOString()
			return getBookingsAfterDate(queryDate)
		},
		queryKey: ['bookings', `last-${numDays}`],
	})

	return { bookings, isLoading }
}
