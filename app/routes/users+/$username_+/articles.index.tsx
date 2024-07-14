import { type MetaFunction } from '@remix-run/react'
import { type loader as articlesLoader } from './articles.tsx'

export default function ArticlesIndexRoute() {
	return (
		<div className="container pt-12">
			<p className="text-body-md">Select an article</p>
		</div>
	)
}

export const meta: MetaFunction<
	null,
	{ 'routes/users+/$username_+/articles': typeof articlesLoader }
> = ({ params, matches }) => {
	const articlesMatch = matches.find(
		m => m.id === 'routes/users+/$username_+/articles',
	)
	const displayName = articlesMatch?.data?.owner.name ?? params.username
	const articleCount = articlesMatch?.data?.owner.articles.length ?? 0
	const articlesText = articleCount === 1 ? 'article' : 'articles'
	return [
		{ title: `${displayName}'s Articles | Epic News` },
		{
			name: 'description',
			content: `Checkout ${displayName}'s ${articleCount} ${articlesText} on Epic News`,
		},
	]
}
