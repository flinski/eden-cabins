import Input from '@/ui/Input'
import Logo from '@/ui/Logo'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useLogin } from './useLogin'

export default function LoginForm() {
	const [email, setEmail] = useState('john@example.com')
	const [password, setPassword] = useState('pass1234')
	const { isLogining, login } = useLogin()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!email || !password) return

		login({ email, password })
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-ui-50 border-ui-200 flex flex-col gap-6 rounded-lg border p-8"
		>
			<div>
				<Logo />
			</div>

			<div className="text-h2 leading-heading font-semibold">Log in to your account</div>

			<div className="flex flex-col gap-1">
				<label htmlFor="">Email address</label>
				<Input
					type="email"
					id="email"
					autoComplete="username"
					disabled={isLogining}
					value={email}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
				/>
			</div>

			<div className="flex flex-col gap-1">
				<label htmlFor="">Password</label>
				<Input
					type="password"
					id="password"
					autoComplete="current-password"
					disabled={isLogining}
					value={password}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
				/>
			</div>

			<div className="flex">
				<button
					disabled={isLogining}
					className="bg-accent-600 hover:bg-accent-500 text-ui-50 disabled:hover:bg-accent-600 flex grow-1 cursor-pointer items-center justify-center self-end rounded-md px-3 py-2 disabled:cursor-default disabled:opacity-50"
				>
					{isLogining ? 'Loading...' : 'Login'}
				</button>
			</div>
		</form>
	)
}
