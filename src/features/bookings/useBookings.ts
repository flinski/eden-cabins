import { useSearchParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { getBookings } from '@/services/apiBookings'

export function useBookings() {
	const [searchParams] = useSearchParams()

	const filterValue = searchParams.get('status')
	const filter =
		!filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue }

	const sortByRaw = searchParams.get('sortBy') ?? 'startDate-desc'
	const [field, direction] = sortByRaw.split('-')
	const sortBy = { field, direction }

	const {
		isPending: isLoading,
		error,
		data: bookings,
	} = useQuery({
		queryKey: ['bookings', filter, sortBy],
		queryFn: () => getBookings({ filter, sortBy }),
	})

	return { isLoading, error, bookings }
}
