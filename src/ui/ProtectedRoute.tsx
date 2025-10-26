import { useNavigate } from 'react-router'
import { useUser } from '@/features/auth/useUser'
import Spinner from '@/ui/Spinner'
import { useEffect } from 'react'

type ProtectedRouteProps = {
	children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
	const navigate = useNavigate()
	const { isLoading, isAuthenticated } = useUser()

	useEffect(() => {
		if (!isAuthenticated && !isLoading) {
			navigate('/login')
		}
	}, [isAuthenticated, isLoading, navigate])

	if (isLoading) {
		return (
			<div className="flex h-screen w-full items-center justify-center">
				<Spinner />
			</div>
		)
	}

	if (isAuthenticated) return children
}
