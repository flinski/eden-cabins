export default function Textarea({ ...props }) {
	return (
		<textarea
			{...props}
			className="border-ui-300 rounded-sm border-2 px-2 disabled:cursor-default disabled:opacity-50"
		></textarea>
	)
}
