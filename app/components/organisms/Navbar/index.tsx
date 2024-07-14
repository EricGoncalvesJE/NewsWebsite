import { Form, Link } from '@remix-run/react'
import { useState } from 'react'
import { Menu, X } from 'react-feather'

import logo from '~/assets/svg/icon-placeholder.svg'
import { useOptionalUser } from '~/utils'

import Breadcrumbs from '../../molecules/Breadcrumbs'

import NavbarLink from './NavbarLink'

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false)
	const user = useOptionalUser()

	return (
		<header className="relative bg-secondary">
			<div className="md:flex md:justify-between">
				<div className="flex items-center justify-between px-4 py-3">
					<div className="flex items-center justify-center">
						<Link to="/">
							<img
								className="h-16 w-16"
								src={logo}
								alt="Dobu Martial Arts Gym"
							/>
						</Link>
					</div>

					<div className="md:hidden">
						<button
							className="block text-secondary hover:text-white focus:text-white focus:outline-none"
							type="button"
							onClick={() => setIsOpen(!isOpen)}
						>
							{isOpen ? (
								<X className="h-6 w-6 fill-current" />
							) : (
								<Menu className="h-6 w-6 fill-current" />
							)}
						</button>
					</div>
				</div>
				<div
					className={`px-2 pb-4 pt-2 ${
						isOpen ? 'block' : 'hidden'
					} md:flex md:items-center`}
				>
					<NavbarLink url="/memberships">Memberships</NavbarLink>
					<NavbarLink url="/memberships-extra-credit">
						Memberships Extra Credit
					</NavbarLink>

					<div className="mt-4 lg:ml-2 lg:mr-4 lg:mt-0">
						{user ? (
							<Form action="/logout" method="post">
								<button
									type="submit"
									className="border-secondary-dark text-secondary-dark hover:bg-secondary-light active:bg-secondary-light mt-4 rounded border-2 bg-white px-4 py-2 lg:ml-4 lg:mt-0"
								>
									Logout
								</button>
							</Form>
						) : (
							<Link
								to="/login"
								className="flex items-center justify-center rounded-md bg-secondary px-4 py-3 font-medium text-white hover:bg-secondary lg:ml-4 lg:mt-0"
							>
								Log In
							</Link>
						)}
					</div>
				</div>
			</div>
			<Breadcrumbs />
		</header>
	)
}

export default Navbar
