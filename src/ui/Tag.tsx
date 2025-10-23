import { cn } from '@/lib/utils'

type TagProps = {
	children?: React.ReactNode
	type: 'blue' | 'green' | 'silver'
}

export default function Tag({ children, type }: TagProps) {
	return (
		<div>
			<span
				className={cn(
					'inline-flex items-center justify-center rounded-full px-2 py-1 text-[13px] font-semibold uppercase',
					type === 'blue' && 'bg-blue-100 text-blue-800',
					type === 'green' && 'bg-accent-100 text-accent-800',
					type === 'silver' && 'bg-ui-100 text-ui-800'
				)}
			>
				{children}
			</span>
		</div>
	)
}
