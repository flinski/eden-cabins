import SignupForm from '@/features/auth/SignupForm'

export default function Users() {
	return (
		<>
			<div className="flex flex-col gap-8">
				<div className="flex items-center justify-between">
					<h1 className="text-h1 leading-heading font-semibold">Create a new user</h1>
				</div>
				<SignupForm />
			</div>
		</>
	)
}
