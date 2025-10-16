import type { Cabin } from '@/services/apiCabins'
import { formatCurrency } from '@/lib/utils'

type CabinRowProps = {
	cabin: Cabin
}

export default function CabinRow({ cabin }: CabinRowProps) {
	const { image, description, name, maxCapacity, regularPrice, discount } = cabin

	return (
		<div className="not-last:border-b-ui-200 grid grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr] items-center gap-6 p-2 not-last:border-b">
			<div className="width-full relative aspect-[16/10] overflow-hidden rounded-sm">
				<img src={image} alt={description} className="absolute top-0 left-0 size-full" />
			</div>
			<div>{name}</div>
			<div>{maxCapacity} guests</div>
			<div className="font-semibold">{formatCurrency(regularPrice)}</div>
			<div className="text-accent-600 font-semibold">{formatCurrency(discount)}</div>
			<button className="bg-ui-200 cursor-pointer rounded-sm py-1 font-semibold hover:bg-red-100 hover:text-red-600">
				Delete
			</button>
		</div>
	)
}
