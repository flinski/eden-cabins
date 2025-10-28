import { useUser } from './useUser'

export default function UserAvatar() {
	const { user } = useUser()
	const { fullName, avatar } = user!.user_metadata

	return (
		<div className="flex items-center gap-3">
			<img src={avatar || '/default-user.jpg'} alt={`Avatar of ${fullName}`} className="size-8" />
			<div>{fullName}</div>
		</div>
	)
}
