import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '#app/utils/misc.tsx'

const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-md text-md font-medium ring-offset-ring transition-colors outline-none focus-visible:ring-2 focus-within:ring-2 ring-ring ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-dark-ring dark:ring-offset-dark-ring',
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground hover:bg-primary/80 dark:bg-dark-primary dark:text-dark-primary-foreground dark:hover:bg-dark-primary/80',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/80 dark:bg-dark-destructive dark:text-dark-destructive-foreground dark:hover:bg-dark-destructive/80',
				outline:
					'border border-input bg-background hover:bg-accent hover:text-accent-foreground darK:border-dark-input dark:bg-dark-background dark:hover:bg-dark-accent dark:hover:text-dark-accent-foreground',
				secondary:
					'bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:bg-dark-secondary dark:text-dark-secondary-foreground dark:hover:bg-dark-secondary/80',
				ghost:
					'hover:bg-accent hover:text-accent-foreground dark:hover:bg-dark-accent dark:hover:text-dark-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline dark:text-dark-primary',
			},
			size: {
				default: 'h-10 px-4 py-2',
				wide: 'px-24 py-5',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				pill: 'px-12 py-3 leading-3',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'

		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		)
	},
)
Button.displayName = 'Button'

export { Button, buttonVariants }
