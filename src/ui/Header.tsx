import HeaderMenu from '@/ui/HeaderMenu'
import UserAvatar from '@/features/auth/UserAvatar'

export default function Header() {
	return (
		<header className="border-ui-200 bg-ui-50 flex min-h-16 items-center justify-end gap-4 border-b px-8">
			<UserAvatar />
			<HeaderMenu />
		</header>
	)
}
