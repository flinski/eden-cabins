import { useQuery } from '@tanstack/react-query'
import { getBooking } from '@/services/apiBookings'
import { useParams } from 'react-router'

export function useBooking() {
	const { bookingId } = useParams()

	const {
		isPending: isLoading,
		error,
		data: booking,
	} = useQuery({
		queryKey: ['booking', bookingId],
		queryFn: () => getBooking(typeof bookingId === 'string' ? bookingId : ''),
		retry: false,
	})

	return { isLoading, error, booking }
}
