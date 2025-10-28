import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { login as loginApi } from '@/services/apiAuth'

export function useLogin() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const { isPending: isLogining, mutate: login } = useMutation({
		mutationFn: ({ email, password }: { email: string; password: string }) =>
			loginApi({ email, password }),
		onSuccess: (user) => {
			queryClient.setQueryData(['user'], user.user)
			navigate('/dashboard', { replace: true })
		},
		onError: (error) => {
			console.log('Error:', error)
			toast.error('Provided email or password are incorrect')
		},
	})

	return { isLogining, login }
}
