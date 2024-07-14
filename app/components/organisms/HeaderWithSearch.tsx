import { Link, useMatches } from '@remix-run/react'
import logo from '~/assets/png/tech-news-logo.png'
import { SearchBar } from '../molecules/SearchBar'

import LoginOrUserDropdown from './LoginOrUserDropdown'

interface HeaderWithSearchProps {
	isAdminUser: boolean
}
export default function HeaderWithSearch({ isAdminUser }: HeaderWithSearchProps) {
	const matches = useMatches()
	const isOnSearchPage = matches.find(m => m.id === 'routes/users+/index')
	const searchBar = isOnSearchPage ? null : <SearchBar status="idle" />

	return (
		<header className="dark:bg-dark-primary/10 bg-primary/10 py-2">
			<nav className="container flex flex-wrap items-center justify-between sm:flex-nowrap md:gap-1">
				<Link to="/">
					<div className="flex items-center px-4">
						<img src={logo} alt="TechNerd Logo" className="mr-4 h-24 w-24" />
						<span className="text-sm text-foreground">Tech nerd news</span>
					</div>
				</Link>
				{isAdminUser && (
					<Link
						to="/admin-review"
						className="mr-4 rounded-lg bg-green-900 px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-green-800"
					>
						Admin Review

					</Link>
				)}
				<Link
					to="/news"
					className="mr-2 rounded-lg bg-sky-400 p-2 px-4 transition-opacity duration-200 hover:opacity-50 dark:bg-sky-700"
				>
					News
				</Link>
				<Link
					to="/about-us"
					className="mr-2 rounded-lg bg-sky-400 p-2 px-4 transition-opacity duration-200 hover:opacity-50 dark:bg-sky-700"
				>
					About
				</Link>
				<Link
					to="/contact-us"
					className="mr-2 rounded-lg bg-sky-400 p-2 px-4 transition-opacity duration-200 hover:opacity-50 dark:bg-sky-700"
				>
					Contact
				</Link>
				<div className="ml-auto hidden max-w-sm flex-1 sm:block">
					{searchBar}
				</div>
				<div className="flex items-center gap-10">
					<LoginOrUserDropdown />
				</div>
				<div className="block w-full sm:hidden">{searchBar}</div>
			</nav>
		</header>
	)
}
