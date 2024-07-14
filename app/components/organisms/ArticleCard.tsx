import { Link } from '@remix-run/react'
import defaultIcon from '~/assets/png/ai-logo@2x.png'
import businessIcon from '~/assets/png/business-logo@2x.png'
import entertainmentIcon from '~/assets/png/games-logo@2x.png'
import techIcon from '~/assets/png/tech-logo@2x.png'
import siteLogo from '~/assets/png/tech-news-logo.png'
import { getArticleImgSrc } from '~/utils/misc.js'

interface ArticleCardProps {
    articleId: string
    title: string
    categoryTitle?: string
    imageId?: string
    level?: 'primary' | 'secondary' | 'tertiary'
}
export default function ArticleCard({
    articleId,
    title,
    categoryTitle,
    imageId,
    level = 'tertiary',
}: ArticleCardProps) {
    const imageSrc = imageId ? getArticleImgSrc(imageId) : siteLogo
    const categoryIcons: Record<string, string> = {
        Technology: techIcon,
        Business: businessIcon,
        Entertainment: entertainmentIcon,
    }

    const categoryIcon = categoryTitle
        ? categoryIcons[categoryTitle]
        : defaultIcon

    const imageWrapperClasses = {
        primary:
            'hidden relative w-full object-cover sm:block sm:h-[12rem] md:h-[23rem]',
        secondary:
            'hidden relative w-full rounded-t-lg object-cover sm:block sm:h-[10rem]',
        tertiary: 'hidden',
    }

    const textWrapperClasses = {
        primary:
            'h-[10rem] flex flex-col justify-between rounded-lg bg-muted p-6 sm:rounded-t-none md:h-[22.5rem]',
        secondary:
            'h-[10rem] flex flex-col justify-between bg-muted p-6 sm:rounded-b-lg sm:h-[11rem]',
        tertiary:
            'h-[10.25rem] flex flex-col rounded-lg justify-between bg-muted p-6',
    }

    return (
        <Link to={`/article/${articleId}`} prefetch='intent'>
            <div className={`${imageWrapperClasses[level]}`}>
                <div className="absolute inset-0 ">
                    <img
                        className="h-full w-full rounded-t-md object-cover"
                        src={imageSrc}
                        alt={title}
                    />
                </div>
            </div>
            <div className={`${textWrapperClasses[level]}`}>
                <h3 className={`line-clamp-2 text-2xl font-bold text-foreground`}>
                    {title}
                </h3>
                <div className="flex items-center gap-3">
                    <img src={categoryIcon} alt={categoryTitle} className="h-6 w-6" />
                    <span className="text-sm text-muted-foreground">
                        {categoryTitle || 'General News'}
                    </span>
                </div>
            </div>
        </Link>
    )
}