import { NavLink, Outlet } from '@remix-run/react'

export default function NewsPage() {
	return (
		<main className="flex flex-col py-4 m-20 dark:bg-sky-950 bg-sky-500 rounded-t-3xl">
			<div className="container">
				<h1 className="text-h1">News</h1>
				<div className="flex space-x-4 py-8">
					<NavLink
						to="technology"
						className={({ isActive }) =>
							`${isActive ? 'text-2xl text-slate-950 underline underline-offset-8' : 'font-bold text-xl text-stone-50'}`
						}
					>
						Technology
					</NavLink>
					<NavLink
						to="entertainment"
						className={({ isActive }) =>
							`${isActive ? 'text-2xl text-slate-950 underline underline-offset-8' : 'font-bold text-xl text-stone-50'}`
						}
					>
						Entertainment
					</NavLink>
					<NavLink
						to="business"
						className={({ isActive }) =>
							`${isActive ? 'text-2xl text-slate-950 underline underline-offset-8' : 'font-bold text-xl text-stone-50'}`
						}
					>
						Business
					</NavLink>
				</div>
			</div >

			<Outlet />
		</main >
	)
}
