import { Link, NavLink } from '@remix-run/react'
import logo from '#app/assets/svg/icon-placeholder.svg'
import { Button } from '#app/components/atoms/Button'
import SocialMediaButtons from '#app/components/molecules/SocialMediaButtons'
import { type FooterProps } from './FooterBasic'

const FooterMenuRight = ({
	companyName = 'CHANGE THIS TO YOUR COMPANY NAME!',
	altText = 'Our company logo',
}: FooterProps) => {
	return (
		<footer className="bg-secondary lg:py-16 dark:bg-dark-secondary">
			<div className="container items-center justify-between border-b border-muted-foreground/75 py-8 lg:flex dark:border-dark-muted-foreground/75">
				<Link to="/" className="flex w-20 items-center justify-center lg:w-24">
					<img src={logo} alt={altText} />
				</Link>

				<div className="lg:flex">
					<div className="flex items-start gap-6 py-8 font-bold text-secondary-foreground lg:mr-24 dark:text-dark-secondary-foreground">
						<div>
							<NavLink to="#">Nav Label</NavLink>
						</div>
						<div>
							<NavLink to="#">Nav Label</NavLink>
						</div>
						<div>
							<NavLink to="#">Nav Label</NavLink>
						</div>
					</div>

					<div className="flex items-center gap-6">
						<div className="lg:mr-4">
							<Link to="/signup">
								<Button>Sign Up</Button>
							</Link>
						</div>
						<div>
							<Link to="/login">
								<Button variant="secondary">Log In</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className="container flex items-center justify-between py-8">
				<div className="text-xs text-muted-foreground/75 dark:text-dark-muted-foreground/75">
					&copy; {companyName} | {new Date().getFullYear()}
				</div>
				<div className="flex w-20 items-center justify-center lg:w-24">
					<SocialMediaButtons />
				</div>
			</div>
		</footer>
	)
}

export default FooterMenuRight
