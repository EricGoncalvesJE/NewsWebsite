import { Parallax, useParallaxController } from 'react-scroll-parallax'

interface ParallaxBackgroundProps {
	description?: string
	title?: string
	image: string
	logo?: string
	altText?: string
	children?: React.ReactNode
}

const ParallaxBackground = ({
	description,
	title,
	image,
	logo,
	altText = 'Welcome to DoBu Martial Arts - where we are stronger together',
	children,
}: ParallaxBackgroundProps) => {
	const parallaxController = useParallaxController()
	const handleLoad = () => parallaxController?.update()

	return (
		<div className="relative sm:pb-16 sm:pt-8">
			<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
				<div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
					<div className="absolute inset-0">
						<Parallax className="hidden lg:block" speed={-20}>
							<img
								className="h-full w-full object-cover"
								src={image}
								alt={altText}
								onLoad={handleLoad}
							/>
						</Parallax>
						<img
							className="h-full w-full object-cover lg:hidden"
							src={image}
							alt={altText}
							onLoad={handleLoad}
						/>
						<div className="bg-primary-light absolute inset-0 mix-blend-multiply" />
					</div>
					<div className="relative px-4 pb-8 pt-16 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-32">
						<h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
							<span className="via-secondary-dark block bg-gradient-to-r from-secondary to-secondary bg-clip-text uppercase text-transparent drop-shadow-md">
								{title}
							</span>
						</h1>
						{logo && (
							<div className="mx-auto my-8 w-32">
								<img src={logo} className="drop-shadow-md" />
							</div>
						)}
						{description && (
							<p className="text-secondary-light mx-auto mt-6 max-w-lg text-center text-2xl drop-shadow-md sm:max-w-3xl lg:text-5xl">
								{description}
							</p>
						)}
						{children && children}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ParallaxBackground
