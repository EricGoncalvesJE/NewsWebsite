import { invariantResponse } from '@epic-web/invariant'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { GeneralErrorBoundary } from '#app/components/ErrorBoundary.js'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { ArticleEditor } from './__article-editor.tsx'

export { action } from './__article-editor.server.tsx'

export async function loader({ params, request }: LoaderFunctionArgs) {
	const userId = await requireUserId(request)
	const categories = await prisma.articleCategory.findMany({
		select: {
			id: true,
			name: true,
		},
	})
	const article = await prisma.article.findFirst({
		select: {
			id: true,
			title: true,
			content: true,
			category: {
				select: {
					id: true,
					name: true,
				},
			},
			images: {
				select: {
					id: true,
					altText: true,
				},
			},
		},
		where: {
			id: params.articleId,
			ownerId: userId,
		},
	})
	invariantResponse(article, 'Not found', { status: 404 })
	return json({ article: article, categories })
}

export default function ArticleEdit() {
	const data = useLoaderData<typeof loader>()

	return <ArticleEditor categories={data.categories} article={data.article} />
}

export function ErrorBoundary() {
	return (
		<GeneralErrorBoundary
			statusHandlers={{
				404: ({ params }) => (
					<p>No article with the id "{params.articleId}" exists</p>
				),
			}}
		/>
	)
}
