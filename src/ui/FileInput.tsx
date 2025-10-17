export default function FileInput({ ...props }) {
	return (
		<input
			{...props}
			className="file:bg-accent-600 file:text-ui-50 hover:file:bg-accent-500 cursor-pointer file:cursor-pointer file:rounded-md file:px-3 file:py-2 disabled:cursor-default disabled:opacity-50"
		/>
	)
}
