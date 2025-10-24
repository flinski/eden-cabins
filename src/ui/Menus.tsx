import { useOutsideClick } from '@/hooks/useOutsideClick'
import { EllipsisVertical, type LucideProps } from 'lucide-react'
import {
	createContext,
	useContext,
	useState,
	type ForwardRefExoticComponent,
	type RefAttributes,
} from 'react'
import { createPortal } from 'react-dom'

type MenusValue = {
	openId: string
	open: React.Dispatch<React.SetStateAction<string>>
	close: () => void
	position: {
		x: number
		y: number
	} | null
	setPosition: React.Dispatch<
		React.SetStateAction<{
			x: number
			y: number
		} | null>
	>
}

const MenusContext = createContext<MenusValue | null>(null)

type MenusProps = {
	children: React.ReactNode
}

export default function Menus({ children }: MenusProps) {
	const [openId, setOpenId] = useState('')
	const [position, setPosition] = useState<{ x: number; y: number } | null>(null)
	console.log('openId:', openId)
	const open = setOpenId
	const close = () => setOpenId('')

	return (
		<MenusContext.Provider value={{ openId, open, close, position, setPosition }}>
			{children}
		</MenusContext.Provider>
	)
}

function useMenus() {
	const value = useContext(MenusContext)

	if (!value) {
		throw new Error('MenusContext can not be used outside the Menus component')
	}

	return value
}

type MenuProps = {
	children: React.ReactNode
}

function Menu({ children }: MenuProps) {
	return <div>{children}</div>
}

type ToggleProps = {
	id: string
}

function Toggle({ id }: ToggleProps) {
	const { openId, open, close, setPosition } = useMenus()

	const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (!(e.target instanceof Element)) return

		const rect = e.target.closest('button')!.getBoundingClientRect()
		setPosition({
			x: window.innerWidth - rect.width - rect.x,
			y: rect.y + rect.height + 8,
		})
		console.log('id:', id)
		// console.log('openId:', openId)
		if (openId === '' || openId !== id) {
			open(id)
		} else {
			close()
		}
	}

	return (
		<button
			onClick={(e) => handleClick(e)}
			className="hover:bg-ui-100 flex size-9 cursor-pointer items-center justify-center rounded-md"
		>
			<EllipsisVertical size={20} />
		</button>
	)
}

type ListProps = {
	children: React.ReactNode
	id: string
}

function List({ children, id }: ListProps) {
	const { openId, close, position } = useMenus()
	const listRef = useOutsideClick<HTMLUListElement>(close)

	if (openId !== id) {
		return null
	}

	return createPortal(
		<ul
			ref={listRef}
			className="bg-ui-50 border-ui-200 font-inter fixed flex flex-col gap-0 rounded-md border p-2 font-medium shadow-lg"
			style={{ top: position?.y, right: position?.x }}
		>
			{children}
		</ul>,
		document.body
	)
}

type ButtonProps = {
	children: React.ReactNode
	icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
	onClick?: () => void
}

function Button({ children, icon, onClick }: ButtonProps) {
	const { close } = useMenus()
	const Icon = icon

	const handleClick = () => {
		onClick?.()
		close()
	}

	return (
		<li className="flex items-center">
			<button
				onClick={handleClick}
				className="hover:bg-ui-100 text-ui-600 hover:text-ui-950 flex w-full cursor-pointer items-center gap-2 rounded-sm px-3 py-2"
			>
				<Icon size={16} /> <span>{children}</span>
			</button>
		</li>
	)
}

Menus.Menu = Menu
Menus.Toggle = Toggle
Menus.List = List
Menus.Button = Button
