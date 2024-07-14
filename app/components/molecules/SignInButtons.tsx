import { useOptionalUser } from '~/utils/user'
import ButtonLink, { ButtonTypes } from '../atoms/ButtonLink'

const SignInButtons = () => {
	const user = useOptionalUser()

	return (
		<div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
			{user ? (
				<ButtonLink to="/memberships" type={ButtonTypes.secondary}>
					View account
				</ButtonLink>
			) : (
				<div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
					<ButtonLink to="/join" type={ButtonTypes.secondary}>
						Sign up
					</ButtonLink>
					<ButtonLink to="/login" type={ButtonTypes.primary}>
						Log In
					</ButtonLink>
				</div>
			)}
		</div>
	)
}

export default SignInButtons
