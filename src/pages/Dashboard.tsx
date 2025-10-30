import DashboardFilter from '@/features/dashboard/DashboardFilter'
import DashboardLayout from '@/features/dashboard/DashboardLayout'

export default function Dashboard() {
	return (
		<>
			<div className="flex flex-col gap-8">
				<div className="flex items-center justify-between">
					<h1 className="text-h1 leading-heading font-semibold">Dashboard</h1>
					<DashboardFilter />
				</div>
				<DashboardLayout />
			</div>
		</>
	)
}
