export default function ErrorFallback({
	error,
	resetErrorBoundary,
}: {
	error: Error
	resetErrorBoundary: () => void
}) {
	return (
		<div className="leading-text font-inter text-ui-950 bg-ui-100 flex h-screen min-h-full flex-col items-center justify-center gap-4 overflow-hidden font-medium antialiased">
			<h1 className="text-h1 leading-heading font-semibold">Somethings went wrong 🤔</h1>
			<div className="text-ui-500">Error: {error.message}</div>
			<button
				onClick={resetErrorBoundary}
				className="bg-accent-600 text-ui-50 hover:bg-accent-700 cursor-pointer rounded-md px-3 py-2"
			>
				Try again
			</button>
		</div>
	)
}
