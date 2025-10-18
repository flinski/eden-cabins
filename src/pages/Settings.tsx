import UpdateSettingsForm from '@/features/settings/UpdateSettingsForm'

export default function Settings() {
	return (
		<>
			<div className="flex flex-col gap-8">
				<div className="flex items-center justify-between">
					<h1 className="text-h1 leading-heading font-semibold">Update hotel settings</h1>
				</div>
				<UpdateSettingsForm />
			</div>
		</>
	)
}
