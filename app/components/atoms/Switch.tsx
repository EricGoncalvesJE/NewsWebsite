import * as RadixSwitch from '@radix-ui/react-switch'
import React from 'react'

interface SwitchProps {
	handleCheckedChange?: (checked: boolean) => void
	label?: React.ReactNode
	name: string
}

export default function Switch({
	handleCheckedChange,
	label,
	name,
}: SwitchProps) {
	return (
		<>
			{label ? (
				<label className="flex cursor-pointer items-center space-x-4 font-medium">
					<span className="text-xs text-foreground dark:text-dark-foreground">
						{label}
					</span>
					<RadixSwitch.Root
						onCheckedChange={
							handleCheckedChange
								? checked => handleCheckedChange(checked)
								: undefined
						}
						className="bg-switch active:bg-switch-active data-[state=checked]:bg-switch-checked active:data-[state=checked]:bg-switch-active dark:bg-dark-switch dark:active:bg-dark-switch-active dark:data-[state=checked]:bg-switch dark:active:data-[state=checked]:bg-dark-switch-active w-11 rounded-full p-px shadow-inner shadow-black/50 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
						name={name}
					>
						<RadixSwitch.Thumb className="bg-switch-foreground dark:bg-dark-switch-foreground data-[state=checked]:bg-switch-foreground-checked dark:data-[state=checked]:bg-dark-switch-foreground-checked block h-5 w-5 rounded-full shadow-sm shadow-black/50 transition data-[state=checked]:translate-x-[22px]" />
					</RadixSwitch.Root>
				</label>
			) : (
				<RadixSwitch.Root className="bg-switch active:bg-switch-active data-[state=checked]:bg-switch-checked active:data-[state=checked]:bg-switch-active dark:bg-dark-switch dark:active:bg-dark-switch-active dark:data-[state=checked]:bg-switch dark:active:data-[state=checked]:bg-dark-switch-active w-11 rounded-full p-px shadow-inner shadow-black/50 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
					<RadixSwitch.Thumb className="bg-switch-foreground dark:bg-dark-switch-foreground data-[state=checked]:bg-switch-foreground-checked dark:data-[state=checked]:bg-dark-switch-foreground-checked block h-5 w-5 rounded-full shadow-sm shadow-black/50 transition data-[state=checked]:translate-x-[22px]" />
				</RadixSwitch.Root>
			)}
		</>
	)
}
