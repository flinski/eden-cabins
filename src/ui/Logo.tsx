import LogoIcon from './LogoIcon'

export default function Logo() {
	return (
		<div className="text-accent-600 flex flex-col items-center gap-1">
			<LogoIcon className="size-15" />
			<span className="font-medium tracking-wide uppercase">Eden Cabins</span>
		</div>
	)
}
