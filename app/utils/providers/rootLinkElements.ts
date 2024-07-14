import { href as iconsHref } from '#/app/components/atoms/Icon'
import tailwindStyleSheetUrl from '~/styles/tailwind.css?url'

export default [
	// Preload svg sprite as a resource to avoid render blocking
	{ rel: 'preload', href: iconsHref, as: 'image' },
	// Preload CSS as a resource to avoid render blocking
	{ rel: 'mask-icon', href: '/favicons/mask-icon.svg' },
	{
		rel: 'alternate icon',
		type: 'image/png',
		href: '/favicons/favicon-32x32.png',
	},
	{ rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon.png' },
	{
		rel: 'manifest',
		href: '/site.webmanifest',
		crossOrigin: 'use-credentials',
	} as const, // necessary to make typescript happy
	//These should match the css preloads above to avoid css as render blocking resource
	{ rel: 'icon', type: 'image/svg+xml', href: '/favicons/favicon.svg' },
	{ rel: 'stylesheet', href: tailwindStyleSheetUrl },
].filter(Boolean)
