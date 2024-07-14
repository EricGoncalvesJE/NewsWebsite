interface HeadingProps {
	children: React.ReactNode
	level: 'h1' | 'h2' | 'h3'
	isCentred?: boolean
	className?: string
}

const Heading = ({
	children,
	level,
	isCentred = false,
	className = '',
}: HeadingProps) => {
	const headingLevels = {
		h1: (
			<h1
				className={`text-center text-6xl font-black leading-relaxed tracking-wide text-primary-foreground dark:text-dark-primary-foreground ${
					isCentred ? 'text-center' : ''
				} ${className}`}
			>
				{children}
			</h1>
		),
		h2: (
			<h2
				className={`text-center text-4xl font-black leading-relaxed tracking-wide text-primary-foreground dark:text-dark-primary-foreground ${
					isCentred ? 'text-center' : ''
				} ${className}`}
			>
				{children}
			</h2>
		),
		h3: (
			<h3
				className={`mb-2 text-2xl font-bold leading-loose tracking-wide text-primary-foreground dark:text-dark-primary-foreground ${
					isCentred ? 'text-center' : ''
				} ${className}`}
			>
				{children}
			</h3>
		),
	}

	return <>{headingLevels[level]}</>
}

export default Heading
