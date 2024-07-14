import { useOptionalUser } from '#app/utils/user'
import { Link } from '@remix-run/react'
import UserDropdown from '../molecules/UserDropDown'
import { Button } from '../atoms/Button'

export default function () {
	const user = useOptionalUser()

	return (
		<>
			{user ? (
				<UserDropdown />
			) : (
				<Button asChild variant="default" size="lg">
					<Link to="/login">Log In</Link>
				</Button>
			)}
		</>
	)
}
