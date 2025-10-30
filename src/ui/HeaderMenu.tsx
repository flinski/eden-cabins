import Logout from '@/features/auth/Logout'

export default function HeaderMenu() {
	return (
		<ul className="flex items-center gap-1">
			<li>
				<Logout />
			</li>
		</ul>
	)
}
