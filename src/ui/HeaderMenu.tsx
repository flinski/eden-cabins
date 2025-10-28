import { useNavigate } from 'react-router'
import Logout from '@/features/auth/Logout'
import { CircleUserRound } from 'lucide-react'

export default function HeaderMenu() {
	const navigate = useNavigate()

	return (
		<ul className="flex items-center gap-1">
			<li>
				<button
					onClick={() => navigate('/account')}
					className="text-ui-600 hover:bg-accent-100 hover:text-accent-700 disabled:hover:text-ui-600 inline-flex size-9 cursor-pointer items-center justify-center rounded-md disabled:cursor-default disabled:opacity-50 disabled:hover:bg-transparent"
				>
					<CircleUserRound size={20} />
				</button>
			</li>
			<li>
				<Logout />
			</li>
		</ul>
	)
}
