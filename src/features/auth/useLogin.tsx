import { login as loginApi } from '@/services/apiAuth'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

export function useLogin() {
	const navigate = useNavigate()

	const { isPending: isLogining, mutate: login } = useMutation({
		mutationFn: ({ email, password }: { email: string; password: string }) =>
			loginApi({ email, password }),
		onSuccess: () => {
			navigate('/dashboard')
		},
		onError: (error) => {
			console.log('Error:', error)
			toast.error('Provided email or password are incorrect')
		},
	})

	return { isLogining, login }
}
