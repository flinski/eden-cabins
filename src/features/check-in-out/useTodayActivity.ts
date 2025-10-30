import { getStaysTodayActivity } from '@/services/apiBookings'
import { useQuery } from '@tanstack/react-query'

export function useTodayActivity() {
	const { isPending: isLoading, data: activities } = useQuery({
		queryFn: getStaysTodayActivity,
		queryKey: ['today-activity'],
	})

	return { activities, isLoading }
}
