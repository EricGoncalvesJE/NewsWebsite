import { useFetchers } from '@remix-run/react'
import { z } from 'zod'
import { parseWithZod } from '@conform-to/zod'

export const ThemeFormSchema = z.object({
	theme: z.enum(['system', 'light', 'dark']),
})

/**
 * If the user's changing their theme mode preference, this will return the
 * value it's being changed to.
 */
export default function useOptimisticThemeMode() {
	const fetchers = useFetchers()
	const themeFetcher = fetchers.find(f => f.formAction === '/')

	if (themeFetcher && themeFetcher.formData) {
		const submission = parseWithZod(themeFetcher.formData, {
			schema: ThemeFormSchema,
		})

		if (submission.status === 'success') {
			return submission.value.theme
		}
	}
}
