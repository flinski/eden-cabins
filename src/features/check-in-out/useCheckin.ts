import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'

import { updateBooking } from '@/services/apiBookings'

export function useCheckin() {
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const { mutate: checkin, isPending: isCheckingIn } = useMutation({
		mutationFn: ({
			bookingId,
			breakfast,
		}: {
			bookingId: string
			breakfast?: {
				hasBreakfast: boolean
				extrasPrice: number
				totalPrice: number
			}
		}) => updateBooking(bookingId, { status: 'checked-in', isPaid: true, ...breakfast }),
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} successfully checked in`)
			queryClient.invalidateQueries({ queryKey: ['booking'] })
			navigate('/')
		},
		onError: () => {
			toast.error('There was an error while checking in')
		},
	})

	return { isCheckingIn, checkin }
}
