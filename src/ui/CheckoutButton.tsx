import { useCheckout } from '@/features/check-in-out/useCheckout'

type CheckoutButtonProps = {
	bookingId: string
	children: React.ReactNode
}

export default function CheckoutButton({ children, bookingId }: CheckoutButtonProps) {
	const { checkout, isCheckingOut } = useCheckout()

	return (
		<button
			onClick={() => checkout(bookingId)}
			disabled={isCheckingOut}
			className="bg-accent-600 text-ui-50 hover:bg-accent-700 cursor-pointer rounded-sm px-2 py-1 text-center"
		>
			{children}
		</button>
	)
}
