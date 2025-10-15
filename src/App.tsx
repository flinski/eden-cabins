import { BrowserRouter, Navigate, Route, Routes } from 'react-router'

import AppLayout from '@/ui/AppLayout'

import Dashboard from '@/pages/Dashboard'
import Bookings from '@/pages/Bookings'
import Cabins from '@/pages/Cabins'
import Users from '@/pages/Users'
import Settings from '@/pages/Settings'
import Account from '@/pages/Account'
import Login from '@/pages/Login'
import PageNotFound from '@/pages/PageNotFound'

export default function App() {
	return (
		<div className="leading-text font-inter text-ui-950 bg-ui-100 overflow-hidden font-medium antialiased">
			<BrowserRouter>
				<Routes>
					<Route element={<AppLayout />}>
						<Route index element={<Navigate replace to="dashboard" />} />
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="bookings" element={<Bookings />} />
						<Route path="cabins" element={<Cabins />} />
						<Route path="users" element={<Users />} />
						<Route path="settings" element={<Settings />} />
						<Route path="account" element={<Account />} />
					</Route>
					<Route path="login" element={<Login />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}
