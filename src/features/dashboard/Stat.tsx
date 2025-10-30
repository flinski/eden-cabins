import { cn } from '@/lib/utils'
import type { LucideProps } from 'lucide-react'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'

type StatProps = {
	icon?: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
	title?: string
	value?: string | number
	color?: string
	className?: string
}

export default function Stat({ icon, title, value, color, className }: StatProps) {
	const Icon = icon

	return (
		<div
			className={cn(
				'bg-ui-50 border-ui-200 flex items-center gap-4 rounded-lg border p-4',
				className
			)}
		>
			<div className={cn('bg-ui-100 rounded-full p-4', color)}>{Icon && <Icon size={32} />}</div>
			<div className="flex flex-col gap-0.5">
				<div className="text-ui-500 text-sm font-semibold uppercase">{title}</div>
				<div className="text-h3 leading-heading">{value}</div>
			</div>
		</div>
	)
}
