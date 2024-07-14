import { invariant } from '@epic-web/invariant'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import NewsIndexGrid from '~/components/organisms/NewsIndexGrid.tsx'
import { toTitleCase } from '~/utils/stringUtils'
import { getPublishedArticlesByCategory } from '~/models/article.server.js'

export async function loader({ params }: LoaderFunctionArgs) {
	const { category } = params

	invariant(typeof category === 'string', 'No category provided')
	const categoryTitle = toTitleCase(category)

	const filteredArticles = await getPublishedArticlesByCategory(category)

	return json({ categoryTitle, filteredArticles })
}

export default function NewsCategoryPage() {
	const { categoryTitle, filteredArticles } = useLoaderData<typeof loader>()

	return (
		<div className="container py-16">
			<NewsIndexGrid
				articles={filteredArticles}
				categoryTitle={categoryTitle}
			/>
		</div>
	)
}