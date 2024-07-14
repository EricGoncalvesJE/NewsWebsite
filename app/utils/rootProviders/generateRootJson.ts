import { getHints } from '../client-hints'
import { getEnv } from '../env.server'
import { getDomainUrl, combineHeaders } from '../misc'
import { getTheme } from '../theme.server'
import { HoneypotInputProps } from 'remix-utils/honeypot/server'
import { Timings } from '../timing.server'

interface RootJsonToast {
	type: 'error' | 'message' | 'success'
	description: string
	id: string
	title?: string | undefined
}

interface RootJsonUser {
	image: {
		id: string
	} | null
	name: string | null
	id: string
	username: string
	roles: {
		name: string
		permissions: {
			action: string
			entity: string
			access: string
		}[]
	}[]
}

interface GenerateRootJsonArgs {
	user: RootJsonUser | null
	request: Request
	honeyProps: HoneypotInputProps
	toast: RootJsonToast | null
	csrfToken: string
	timings: Timings
	toastHeaders: Headers | null
	csrfCookieHeader: string | null
}

export default function generateRootJson({
	user,
	request,
	honeyProps,
	toast,
	csrfToken,
	timings,
	toastHeaders,
	csrfCookieHeader,
}: GenerateRootJsonArgs) {
	const pageData = {
		user,
		requestInfo: {
			hints: getHints(request),
			origin: getDomainUrl(request),
			path: new URL(request.url).pathname,
			userPrefs: {
				theme: getTheme(request),
			},
		},
		ENV: getEnv(),
		toast,
		honeyProps,
		csrfToken,
		isAdminUser: user ? user.roles.some(role => role.name === 'admin') : false,
	}
	const headerData = {
		headers: combineHeaders(
			{ 'Server-Timing': timings.toString() },
			toastHeaders,
			csrfCookieHeader ? { 'set-cookie': csrfCookieHeader } : null,
		),
	}

	return { pageData, headerData }
}
