import * as RadioGroup from '@radix-ui/react-radio-group'
import { useState } from 'react'

interface SelectorGroupProps {
	options: { value: string; label: string }[]
	name: string
	initialValue?: string
}

export default function SelectorGroup({ options, name, initialValue, }: SelectorGroupProps) {
	let [selectedValue, setSelectedValue] = useState(initialValue ?? '')

	return (
		<RadioGroup.Root className="space-y-4">
			{options.map(option => (
				<RadioGroup.Item
					className={`flex w-full rounded-md border p-4 transition hover:border-sky-400 hover:bg-white/40 dark:hover:border-sky-700 dark:hover:bg-white/10 ${option.value === selectedValue
						? 'border-sky-500 bg-white ring-1 ring-inset ring-sky-500 hover:!bg-white/100 dark:text-zinc-950'
						: 'border-gray-500'
						}`}
					key={option.value}
					type="button"
					onClick={() => setSelectedValue(option.value)}
					value={selectedValue}
				>
					<span className="font-semibold">{option.label}</span>
				</RadioGroup.Item>
			))}
			<input type="hidden" name={name} value={selectedValue} />
		</RadioGroup.Root>

	)
}
