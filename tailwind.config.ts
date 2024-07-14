import typographyPlugin from '@tailwindcss/typography'
import { type Config } from 'tailwindcss'
import animatePlugin from 'tailwindcss-animate'
import radixPlugin from 'tailwindcss-radix'
import { extendedTheme } from './app/utils/extended-theme.ts'
import { customPreset } from './app/utils/tailwind-preset.ts'

export default {
	content: ['./app/**/*.{ts,tsx,jsx,js}'],
	darkMode: 'class',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: extendedTheme,
	},
	presets: [customPreset],
	plugins: [animatePlugin, radixPlugin, typographyPlugin],
} satisfies Config
