import fallbackIcon from '~/assets/png/ai-logo@2x.png'
import businessIcon from '~/assets/png/business-logo@2x.png'
import entertainmentIcon from '~/assets/png/games-logo@2x.png'
import techIcon from '~/assets/png/tech-logo@2x.png'

export function getCategoryIconSrc(categoryTitle: string | null): string {
	const categoryIcons: Record<string, string> = {
		Technology: techIcon,
		Business: businessIcon,
		Entertainment: entertainmentIcon,
	}

	// If the category title is not found in the categoryIcons object,
	// the fallbackIcon will be used instead
	const initialIcon = categoryTitle ? categoryIcons[categoryTitle] : undefined
	const finalIcon = initialIcon || fallbackIcon

	return finalIcon
}

interface CategoryLabelProps {
	categoryTitle: string | null
}
export default function CategoryLabel({ categoryTitle }: CategoryLabelProps) {
	return (
		<div className="flex items-center gap-3">
			<img
				src={getCategoryIconSrc(categoryTitle)}
				alt={categoryTitle || 'General News'}
				className="h-6 w-6"
			/>
			<span className="text-sm text-muted-foreground">
				{categoryTitle ?? 'General News'}
			</span>
		</div>
	)
}
