import { invariant } from '@epic-web/invariant'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import SingleArticle from '~/components/organisms/SingleArticle.tsx'
import { getSingleArticle } from '~/models/article.server.tsx'

export async function loader({ params }: LoaderFunctionArgs) {
	const { articleId } = params
	invariant(typeof articleId === 'string', 'No article ID provided')

	const article = await getSingleArticle(articleId)

	return json({ article })
}

const ArticleNotFound = () => {
	return (
		<div className="container flex h-full flex-1 flex-col items-center justify-center">
			<h2 className="pb-8 text-center text-h2">No article found 🤔</h2>
			<p className="text-center text-xl">
				Please check the article ID in your browser and try again.
			</p>
		</div>
	)
}

export default function ArticlePage() {
	const { article } = useLoaderData<typeof loader>()

	return article ? <SingleArticle article={article} /> : <ArticleNotFound />
}
