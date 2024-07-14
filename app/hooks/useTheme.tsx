import { useHints } from '~/utils/client-hints'
import { useRequestInfo } from '~/utils/request-info'
import useOptimisticThemeMode from './useOptimisticThemeMode'

/**
 * @returns the user's theme preference, or the client hint theme if the user
 * has not set a preference.
 */
export default function useTheme() {
	const hints = useHints()
	const requestInfo = useRequestInfo()
	const optimisticMode = useOptimisticThemeMode()
	if (optimisticMode) {
		return optimisticMode === 'system' ? hints.theme : optimisticMode
	}
	return requestInfo.userPrefs.theme ?? hints.theme
}
