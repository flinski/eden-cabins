import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	build: {
		minify: true,
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src/'),
		},
	},
})
