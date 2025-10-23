import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { CabinData } from '@/features/cabins/CreateCabinForm'
import type { Cabin, NewCabin } from '@/services/apiCabins'
import { differenceInDays, formatDistance, parseISO } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatCurrency(value: number) {
	return new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(value)
}

export function cabinDataToNewCabin(data: CabinData): NewCabin {
	return {
		...data,
		maxCapacity: Number(data.maxCapacity),
		regularPrice: Number(data.regularPrice),
		discount: Number(data.discount),
		image: typeof data.image === 'string' ? data.image : data.image[0],
	}
}

export function cabinToCabinData(cabin: Cabin) {
	return {
		name: cabin.name,
		maxCapacity: String(cabin.maxCapacity),
		regularPrice: String(cabin.regularPrice),
		discount: String(cabin.discount),
		description: cabin.description,
		image: cabin.image,
	}
}

export function isToday() {}

export function formatDistanceFromNow(date: string) {
	return formatDistance(parseISO(date), new Date(), {
		addSuffix: true,
	})
		.replace('about', '')
		.replace('in', 'In')
}

export function subtractDates(date1: string, date2: string) {
	return differenceInDays(parseISO(String(date1)), parseISO(String(date2)))
}
