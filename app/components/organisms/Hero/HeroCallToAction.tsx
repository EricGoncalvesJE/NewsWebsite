interface HeroCallToActionProps {
	image: string
	imageRight?: boolean
	hasBackgroundColour?: boolean
	children: React.ReactNode
}

const HeroCallToAction = ({
	children,
	image,
	imageRight = false,
	hasBackgroundColour = false,
}: HeroCallToActionProps) => {
	return (
		<div
			className={`md:mx-auto md:flex md:max-w-6xl ${imageRight && 'md:flex-row-reverse'
				}`}
		>
			<div className="relative flex h-96 items-center justify-center overflow-hidden md:h-[32rem] md:w-1/2">
				<img
					src={image}
					alt="A hero with a call to action."
					className="absolute min-h-full min-w-full object-cover object-center"
				/>
			</div>
			<div className="relative flex h-96 items-center justify-center md:h-[32rem] md:w-1/2">
				{children}
			</div>
		</div>
	)
}

export default HeroCallToAction
