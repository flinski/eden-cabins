import { cn } from '@/lib/utils'
import type { Cabin } from '@/services/apiCabins'
import { createContext, useContext, type JSX } from 'react'

type TableValue = {
	columns: string
}

const TableContext = createContext<TableValue | null>(null)

type TableProps = {
	children: React.ReactNode
	columns: string
}

export default function Table({ children, columns }: TableProps) {
	return (
		<TableContext.Provider value={{ columns }}>
			<div className="bg-ui-50 border-ui-200 rounded-lg border" role="table">
				{children}
			</div>
		</TableContext.Provider>
	)
}

function useTable() {
	const value = useContext(TableContext)

	if (!value) {
		throw new Error('TableContext can not be used outside the Table component')
	}

	return value
}

type HeaderProps = {
	children: React.ReactNode
}

function Header({ children }: HeaderProps) {
	const { columns } = useTable()

	return (
		<header
			className={cn(
				'text-ui-700 border-ui-200 grid items-center gap-6 border-b px-2 py-4 font-semibold uppercase',
				columns
			)}
			role="row"
		>
			{children}
		</header>
	)
}

type RowProps = {
	children: React.ReactNode
}

function Row({ children }: RowProps) {
	const { columns } = useTable()

	return (
		<div
			className={cn(
				'not-last:border-b-ui-200 grid items-center gap-6 p-2 not-last:border-b',
				columns
			)}
			role="row"
		>
			{children}
		</div>
	)
}

type BodyProps = {
	data: Cabin[]
	render: (cabin: Cabin) => JSX.Element
}

function Body({ data, render }: BodyProps) {
	if (data?.length === 0) {
		return <p className="px-4 py-3 text-center">No data to show at the moment</p>
	}

	return <section>{data.map(render)}</section>
}

Table.Header = Header
Table.Row = Row
Table.Body = Body
