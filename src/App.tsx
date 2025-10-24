import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { Toaster } from 'react-hot-toast'

import AppLayout from '@/ui/AppLayout'

import Dashboard from '@/pages/Dashboard'
import Bookings from '@/pages/Bookings'
import Cabins from '@/pages/Cabins'
import Users from '@/pages/Users'
import Settings from '@/pages/Settings'
import Account from '@/pages/Account'
import Login from '@/pages/Login'
import PageNotFound from '@/pages/PageNotFound'
import Booking from '@/pages/Booking'
import Checkin from '@/pages/Checkin'

const queryClient = new QueryClient()

export default function App() {
	return (
		<div className="leading-text font-inter text-ui-950 bg-ui-100 overflow-hidden font-medium antialiased">
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Routes>
						<Route element={<AppLayout />}>
							<Route index element={<Navigate replace to="dashboard" />} />
							<Route path="dashboard" element={<Dashboard />} />
							<Route path="bookings" element={<Bookings />} />
							<Route path="bookings/:bookingId" element={<Booking />} />
							<Route path="checkin/:bookingId" element={<Checkin />} />
							<Route path="cabins" element={<Cabins />} />
							<Route path="users" element={<Users />} />
							<Route path="settings" element={<Settings />} />
							<Route path="account" element={<Account />} />
						</Route>
						<Route path="login" element={<Login />} />
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
				<ReactQueryDevtools initialIsOpen={false} />
				<Toaster
					position="top-center"
					containerStyle={{}}
					toastOptions={{
						success: {
							duration: 3000,
						},
						error: {
							duration: 5000,
						},
						style: {
							color: 'var(--color-ui-950)',
							backgroundColor: 'var(--color-ui-50)',
							paddingInline: '1rem',
							paddingBlock: '0.75rem',
						},
					}}
				/>
			</QueryClientProvider>
		</div>
	)
}
