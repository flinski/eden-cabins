import { useForm, type SubmitHandler } from 'react-hook-form'
import useSignup from '@/features/auth/useSignup'
import FormRow from '@/ui/FormRow'
import Input from '@/ui/Input'
import { cn } from '@/lib/utils'

type UserData = {
	fullName: string
	email: string
	password: string
	passwordConfirm: string
}

export default function SignupForm() {
	const { register, formState, handleSubmit, getValues, reset } = useForm<UserData>()
	const { errors } = formState
	const { signup, isLoading } = useSignup()

	const onSubmit: SubmitHandler<UserData> = ({ fullName, email, password }) => {
		signup({ fullName, email, password }, { onSettled: () => reset() })
	}

	return (
		<form
			style={isLoading ? { pointerEvents: 'none' } : {}}
			onSubmit={handleSubmit(onSubmit)}
			className={cn(
				'bg-ui-50 font-inter border-ui-200 flex flex-col rounded-lg border px-8 py-4 font-medium',
				isLoading && 'opacity-50'
			)}
		>
			<FormRow id="fullName" label="Full name" errors={errors}>
				<Input
					type="text"
					id="fullName"
					{...register('fullName', { required: 'This field is required' })}
				/>
			</FormRow>

			<FormRow id="email" label="Email address" errors={errors}>
				<Input
					type="email"
					id="email"
					{...register('email', {
						required: 'This field is required',
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: 'Please provide a valid email address',
						},
					})}
				/>
			</FormRow>

			<FormRow id="password" label="Password (min 8 characters)" errors={errors}>
				<Input
					type="password"
					id="password"
					{...register('password', {
						required: 'This field is required',
						minLength: {
							value: 8,
							message: 'Password needs a minimum of 8 characters',
						},
					})}
				/>
			</FormRow>

			<FormRow id="passwordConfirm" label="Repeat password" errors={errors}>
				<Input
					type="password"
					id="passwordConfirm"
					{...register('passwordConfirm', {
						required: 'This field is required',
						validate: (value) => value === getValues().password || 'Passwords need to match',
					})}
				/>
			</FormRow>

			<div className="flex items-center justify-end gap-4 pt-4">
				<button
					type="reset"
					className="border-ui-200 hover:bg-ui-100 cursor-pointer rounded-md border px-3 py-2"
				>
					Cancel
				</button>
				<button className="bg-accent-600 text-accent-50 hover:bg-accent-700 cursor-pointer rounded-md px-3 py-2">
					Create new user
				</button>
			</div>
		</form>
	)
}
