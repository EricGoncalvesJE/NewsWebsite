import { json, useLoaderData } from '@remix-run/react'
import { getAllArticles } from '~/models/article.server.tsx'
import ArticleCard from '~/components/organisms/ArticleCard.js'

export async function loader() {
    const allArticles = await getAllArticles()

    return json({ allArticles })
}

export default function NewsPageIndex() {
    const { allArticles } = useLoaderData<typeof loader>()

    return (
        <main className="container py-16">
            <h2 className="pb-16 text-h2">All news</h2>

            <div className="grid grid-cols-4 gap-8">
                {allArticles.map(article => {
                    return (
                        <ArticleCard
                            articleId={article.id}
                            key={article.id}
                            title={article.title}
                            categoryTitle={article.category?.name}
                            imageId={article.images[0]?.id}
                            level="secondary"
                        />
                    )
                })}
            </div>
        </main>
    )
}