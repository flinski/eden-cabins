import Logo from '@/ui/Logo'
import SidebarNav from '@/ui/SidebarNav'

import Uploader from '@/data/Uploader'

export default function Sidebar() {
	return (
		<aside className="border-ui-200 bg-ui-50 row-[1/-1] flex flex-col gap-5 border-r px-3 py-8">
			<Logo />
			<SidebarNav />

			<Uploader />
		</aside>
	)
}
