import { Outlet } from 'react-router'

import Header from '@/ui/Header'
import Sidebar from '@/ui/Sidebar'

export default function AppLayout() {
	return (
		<div className="grid h-screen grid-cols-[15rem_1fr] grid-rows-[auto_1fr]">
			<Header />
			<Sidebar />
			<main className="bg-ui-100">
				<Outlet />
			</main>
		</div>
	)
}
