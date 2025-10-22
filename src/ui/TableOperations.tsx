import { cn } from '@/lib/utils'

type TableOperationsProps = {
	children?: React.ReactNode
	className?: string
}

export default function TableOperations({ children, className }: TableOperationsProps) {
	return <div className={cn('flex items-center gap-2', className)}>{children}</div>
}
