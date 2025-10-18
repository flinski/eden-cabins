import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEditCabin, type NewCabin } from '@/services/apiCabins'

export function useCreateCabin() {
	const queryClient = useQueryClient()

	const { isPending: isCreating, mutate: createCabin } = useMutation({
		mutationFn: (newCabin: NewCabin) => createEditCabin(newCabin),
		onSuccess: () => {
			toast.success('New cabin successfully created')
			queryClient.invalidateQueries({ queryKey: ['cabins'] })
		},
		onError: (error) => {
			console.error(error.message)
			toast.error(error.message)
		},
	})

	return { isCreating, createCabin }
}
