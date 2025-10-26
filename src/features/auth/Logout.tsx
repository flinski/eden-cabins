import { LogOut } from 'lucide-react'
import { useLogout } from '@/features/auth/useLogout'

export default function Logout() {
	const { isLoading, logout } = useLogout()

	return (
		<button
			disabled={isLoading}
			onClick={() => logout()}
			className="text-ui-600 hover:bg-accent-100 hover:text-accent-700 disabled:hover:text-ui-600 inline-flex size-9 cursor-pointer items-center justify-center rounded-md disabled:cursor-default disabled:opacity-50 disabled:hover:bg-transparent"
		>
			<LogOut size={20} />
		</button>
	)
}
