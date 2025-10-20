import { cloneElement, createContext, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { useOutsideClick } from '@/hooks/useOutsideClick'

type ModalValue = {
	openName: string
	open: React.Dispatch<React.SetStateAction<string>>
	close: () => void
}

const ModalContext = createContext<ModalValue | null>(null)

type ModalProps = {
	children?: React.ReactNode
}

export default function Modal({ children }: ModalProps) {
	const [openName, setOpenName] = useState('')

	const open = setOpenName
	const close = () => setOpenName('')

	return <ModalContext.Provider value={{ openName, open, close }}>{children}</ModalContext.Provider>
}

function useModal() {
	const value = useContext(ModalContext)

	if (!value) {
		throw new Error('ModalContext can not be used outside the Modal component')
	}

	return value
}

type OpenProps = {
	children: React.ReactElement<{ onClick?: React.MouseEventHandler }>
	opens: string
}

function Open({ children, opens }: OpenProps) {
	const { open } = useModal()

	return cloneElement(children, { onClick: () => open(opens) })
}

type WindowProps = {
	children: React.ReactElement<{ onCloseModal?: React.MouseEventHandler }>
	name: string
}

function Window({ children, name }: WindowProps) {
	const { openName, close } = useModal()
	const windowRef = useOutsideClick(close)

	if (name !== openName) {
		return null
	}

	return createPortal(
		<div className="bg-ui-950/10 fixed top-0 left-0 h-screen w-full backdrop-blur-sm">
			<div
				ref={windowRef}
				className="bg-ui-50 border-ui-200 fixed top-[50%] left-[50%] translate-[-50%] rounded-lg border p-2 shadow-xl"
			>
				<button
					onClick={close}
					className="text-ui-950 absolute top-2 right-2 inline-flex cursor-pointer items-center justify-center p-2"
				>
					<X />
				</button>
				<div>{cloneElement(children, { onCloseModal: close })}</div>
			</div>
		</div>,
		document.body
	)
}

Modal.Open = Open
Modal.Window = Window
