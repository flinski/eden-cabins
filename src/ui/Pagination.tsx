import { useSearchParams } from 'react-router'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type PaginationProps = {
	count: number
}

const PAGE_SIZE = 10

export default function Pagination({ count }: PaginationProps) {
	const [searchParams, setSearchParams] = useSearchParams()
	const currentPage = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

	const pageCount = Math.ceil(count / PAGE_SIZE)

	const nextPage = () => {
		const next = currentPage === pageCount ? currentPage : currentPage + 1

		searchParams.set('page', String(next))
		setSearchParams(searchParams)
	}

	const prevPage = () => {
		const prev = currentPage === 1 ? currentPage : currentPage - 1

		searchParams.set('page', String(prev))
		setSearchParams(searchParams)
	}

	if (pageCount <= 1) return null

	return (
		<div className="border-ui-200 flex items-center justify-between border-t px-4 py-3">
			<p>
				Showing <span className="font-semibold">{(currentPage - 1) * PAGE_SIZE + 1}</span> to{' '}
				<span className="font-semibold">
					{currentPage === pageCount ? count : currentPage * PAGE_SIZE}
				</span>{' '}
				of <span className="font-semibold">{count}</span> results
			</p>

			<div className="flex items-center">
				<button
					disabled={currentPage === 1}
					onClick={prevPage}
					className="hover:bg-accent-600 hover:text-ui-50 disabled:hover:text-ui-400 disabled:text-ui-400 inline-flex cursor-pointer items-center justify-center rounded-md py-1 pr-3 pl-1 disabled:cursor-default disabled:hover:bg-transparent"
				>
					<ChevronLeft size={20} />
					<span>Previous</span>
				</button>
				<button
					disabled={currentPage === pageCount}
					onClick={nextPage}
					className="hover:bg-accent-600 hover:text-ui-50 disabled:hover:text-ui-400 disabled:text-ui-400 inline-flex cursor-pointer items-center justify-center rounded-md py-1 pr-1 pl-3 disabled:cursor-default disabled:hover:bg-transparent"
				>
					<span>Next</span>
					<ChevronRight size={20} />
				</button>
			</div>
		</div>
	)
}
