import { useEffect, useRef } from 'react'

export function useOutsideClick(handler: () => void, listenCapturing: boolean = true) {
	const ref = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (!ref.current) {
				return
			}

			if (e.target instanceof Node && !ref.current.contains(e.target)) {
				handler()
			}
		}

		document.addEventListener('click', handleClick, listenCapturing)

		return () => document.removeEventListener('click', handleClick, listenCapturing)
	}, [handler, listenCapturing])

	return ref
}
