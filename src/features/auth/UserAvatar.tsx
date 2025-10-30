import { useUser } from './useUser'

export default function UserAvatar() {
	const { user } = useUser()
	const { fullName } = user!.user_metadata

	return (
		<div className="flex items-center gap-3">
			<div>{fullName}</div>
		</div>
	)
}
