import Filter from '@/ui/Filter'
import SortBy from '@/ui/SortBy'
import TableOperations from '@/ui/TableOperations'

export type OperationsOption = {
	value: string
	label: string
}

export default function BookingTableOperations() {
	return (
		<TableOperations>
			<Filter
				filterField="status"
				options={[
					{ label: 'All', value: 'all' },
					{ label: 'Checked out', value: 'checked-out' },
					{ label: 'Checked in', value: 'checked-in' },
					{ label: 'Unconfirmed', value: 'unconfirmed' },
				]}
			/>
			<SortBy
				options={[
					{ label: 'Sort by date (recent first)', value: 'startDate-desc' },
					{ label: 'Sort by date (erlier first)', value: 'startDate-asc' },
					{ label: 'Sort by amount (high first)', value: 'totalPrice-desc' },
					{ label: 'Sort by amount (low first)', value: 'totalPrice-asc' },
				]}
			/>
		</TableOperations>
	)
}
