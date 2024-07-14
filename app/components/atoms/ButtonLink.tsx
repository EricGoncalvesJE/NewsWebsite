import { Link } from '@remix-run/react'

export enum ButtonTypes {
	primary = `flex items-center justify-center rounded-md bg-primary px-4 py-3 font-medium text-primary-foreground dark:bg-dark-primary dark:text-dark-primary-foreground`,
	secondary = `flex items-center justify-center rounded-md border border-transparent bg-secondary px-4 py-3 text-base font-medium text-secondary-foreground dark:bg-dark-secondary dark:text-dark-secondary-foreground`,
}

interface ButtonLinkProps {
	children: React.ReactNode
	to: string
	type?: ButtonTypes
}

const ButtonLink = ({
	children,
	type = ButtonTypes.primary,
	to,
}: ButtonLinkProps) => {
	return (
		<Link to={to} className={type}>
			{children}
		</Link>
	)
}

export default ButtonLink
