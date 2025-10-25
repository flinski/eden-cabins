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
