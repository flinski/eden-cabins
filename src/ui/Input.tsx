export default function Input({ ...props }) {
	return (
		<input
			{...props}
			className="border-ui-300 h-8 rounded-sm border-2 px-2 disabled:cursor-default disabled:opacity-50"
		/>
	)
}
