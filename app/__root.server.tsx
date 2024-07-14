import { getUser } from '#server/user.server.js'
import { parseWithZod } from '@conform-to/zod'
import { invariantResponse } from '@epic-web/invariant'
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/react'
import { z } from 'zod'
import { getUserId, logout } from './utils/auth.server'
import { csrf } from './utils/csrf.server'
import { honeypot } from './utils/honeypot.server'
import generateRootJson from './utils/rootProviders/generateRootJson'
import { setTheme } from './utils/theme.server'
import { makeTimings, time } from './utils/timing.server'
import { getToast } from './utils/toast.server'

export async function loader({ request }: LoaderFunctionArgs) {
	const timings = makeTimings('root loader')
	const userId: string | null = await time(() => getUserId(request), {
		timings,
		type: 'getUserId',
		desc: 'getUserId in root',
	})

	const user = userId
		? await time(getUser(userId), {
				timings,
				type: 'find user',
				desc: 'find user in root',
			})
		: null

	if (userId && !user) {
		console.info('something weird happened')
		// something weird happened... The user is authenticated but we can't find
		// them in the database. Maybe they were deleted? Let's log them out.
		await logout({ request, redirectTo: '/' })
	}

	const { toast, headers: toastHeaders } = await getToast(request)
	const honeyProps = honeypot.getInputProps()
	const [csrfToken, csrfCookieHeader] = await csrf.commitToken()
	const { pageData, headerData } = generateRootJson({
		user,
		request,
		honeyProps,
		toast,
		csrfToken,
		timings,
		toastHeaders,
		csrfCookieHeader,
	})

	return json(pageData, headerData)
}

const ThemeFormSchema = z.object({
	theme: z.enum(['system', 'light', 'dark']),
})

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const submission = parseWithZod(formData, {
		schema: ThemeFormSchema,
	})

	invariantResponse(submission.status === 'success', 'Invalid theme received')

	const { theme } = submission.value

	console.log({ theme })

	const responseInit = {
		headers: { 'set-cookie': setTheme(theme) },
	}
	return json({ result: submission.reply() }, responseInit)
}
