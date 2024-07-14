import ArticleCard from '~/components/organisms/ArticleCard'

interface IndexArticle {
    title: string
    images: {
        id: string
    }[]
    id: string
    category: {
        name: string
    } | null
}
interface NewsIndexGridProps {
    articles: IndexArticle[]
    categoryTitle?: string
}

export default function NewsIndexGrid({
    articles,
    categoryTitle,
}: NewsIndexGridProps) {
    return (
        <>
            <div className="py-8 lg:py-16">
                <h2 className="mb-16 text-h2">{categoryTitle}</h2>

                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 lg:grid-rows-4">
                    {articles.map((article, index) => {
                        const level =
                            index === 0 ? 'primary' : index < 5 ? 'secondary' : 'tertiary'

                        return (
                            <div
                                key={article.id}
                                className={`col-span-1 ${level === 'secondary' ? 'sm:row-span-2' : ''} ${level === 'primary' ? 'sm:col-span-2 sm:row-span-4' : ''}`}
                            >
                                <ArticleCard
                                    articleId={article.id}
                                    title={article.title}
                                    categoryTitle={categoryTitle}
                                    imageId={article.images[0]?.id}
                                    level={level}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}