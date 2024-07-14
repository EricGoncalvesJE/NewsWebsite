import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '~/utils/db.server.ts'
import { ArticleEditor } from './__article-editor.tsx'

export { action } from './__article-editor.server.tsx'

export async function loader({ request }: LoaderFunctionArgs) {
	await requireUserId(request)
	const categories = await prisma.articleCategory.findMany({
		select: {
			id: true,
			name: true,
		},
	})
	return json({ categories })
}

export default function ArticleNew() {
	const data = useLoaderData<typeof loader>()

	return <ArticleEditor categories={data.categories} />
}
