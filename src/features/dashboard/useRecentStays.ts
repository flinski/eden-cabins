import { getStaysAfterDate } from '@/services/apiBookings'
import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useSearchParams } from 'react-router'

export function useRecentStays() {
	const [searchParams] = useSearchParams()

	const numDays = !searchParams.get('last') ? 7 : Number(searchParams.get('last'))

	const { data: stays, isPending: isLoading } = useQuery({
		queryFn: () => {
			const queryDate = subDays(new Date(), numDays).toISOString()
			return getStaysAfterDate(queryDate)
		},
		queryKey: ['stays', `last-${numDays}`],
	})

	const confirmedStays = stays?.filter(
		(stay) => stay.status === 'checked-in' || stay.status === 'checked-out'
	)

	return { stays, confirmedStays, isLoading, numDays }
}
