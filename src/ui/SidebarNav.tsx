import { NavLink } from 'react-router'
import { CalendarDays, House, Settings, SquareUser, Store } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
	{ text: 'Dashboard', icon: House, path: '/dashboard' },
	{ text: 'Bookings', icon: CalendarDays, path: '/bookings' },
	{ text: 'Cabins', icon: Store, path: '/cabins' },
	{ text: 'Users', icon: SquareUser, path: '/users' },
	{ text: 'Settings', icon: Settings, path: '/settings' },
]

export default function SidebarNav() {
	return (
		<nav>
			<ul className="flex flex-col gap-1">
				{links.map((link) => {
					const Icon = link.icon

					return (
						<li key={link.path}>
							<NavLink
								to={link.path}
								className={({ isActive }) =>
									cn(
										'hover:bg-ui-100 text-ui-600 hover:text-ui-950 flex h-9 items-center gap-2 rounded-md px-3',
										isActive &&
											'text-accent-700 bg-accent-100 hover:text-accent-700 hover:bg-accent-100'
									)
								}
							>
								<Icon size={20} /> <span>{link.text}</span>
							</NavLink>
						</li>
					)
				})}
			</ul>
		</nav>
	)
}
