import Logout from '@/features/auth/Logout'

export default function Header() {
	return (
		<header className="border-ui-200 bg-ui-50 flex min-h-16 items-center justify-end border-b px-8">
			<Logout />
		</header>
	)
}
