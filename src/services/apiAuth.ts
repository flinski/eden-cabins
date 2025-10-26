import supabase from '@/services/supabase'

export async function login({ email, password }: { email: string; password: string }) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	})

	if (error) {
		console.error(error.message)
		throw new Error(error.message)
	}

	return data
}

export async function getCurrentUser() {
	const { data: session } = await supabase.auth.getSession()

	if (!session.session) return null

	const { data, error } = await supabase.auth.getUser()

	console.log(data)

	if (error) {
		console.error(error.message)
		throw new Error(error.message)
	}

	return data.user
}

export async function logout() {
	const { error } = await supabase.auth.signOut()

	if (error) {
		console.error(error.message)
		throw new Error(error.message)
	}
}
