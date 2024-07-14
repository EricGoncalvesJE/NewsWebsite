import { getFormProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { invariantResponse } from '@epic-web/invariant'
import {
	json,
	type LoaderFunctionArgs,
	type ActionFunctionArgs,
} from '@remix-run/node'
import {
	Form,
	Link,
	useActionData,
	useLoaderData,
	type MetaFunction,
} from '@remix-run/react'
import { formatDistanceToNow } from 'date-fns'
import { z } from 'zod'
import { GeneralErrorBoundary } from '~/components/ErrorBoundary.js'
import { floatingToolbarClassName } from '~/components/floating-toolbar.tsx'
import { ErrorList } from '~/components/forms.tsx'
import { Button } from '~/components/ui/button.tsx'
import { Icon } from '~/components/ui/icon.tsx'
import { StatusButton } from '~/components/ui/status-button.tsx'
import { requireUserId } from '~/utils/auth.server.ts'
import { prisma } from '~/utils/db.server.ts'
import { getArticleImgSrc, useIsPending } from '~/utils/misc.tsx'
import { requireUserWithPermission } from '~/utils/permissions.server.ts'
import { redirectWithToast } from '~/utils/toast.server.ts'
import { userHasPermission, useOptionalUser } from '~/utils/user.ts'
import { type loader as articlesLoader } from './articles.tsx'

export async function loader({ params }: LoaderFunctionArgs) {
	const article = await prisma.article.findUnique({
		where: { id: params.articleId },
		select: {
			id: true,
			title: true,
			content: true,
			ownerId: true,
			updatedAt: true,
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
	})

	invariantResponse(article, 'Not found', { status: 404 })

	const date = new Date(article.updatedAt)
	const timeAgo = formatDistanceToNow(date)

	return json({
		article,
		timeAgo,
	})
}

const DeleteFormSchema = z.object({
	intent: z.literal('delete-article'),
	articleId: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)
	const formData = await request.formData()
	const submission = parseWithZod(formData, {
		schema: DeleteFormSchema,
	})
	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{ status: submission.status === 'error' ? 400 : 200 },
		)
	}

	const { articleId } = submission.value

	const article = await prisma.article.findFirst({
		select: { id: true, ownerId: true, owner: { select: { username: true } } },
		where: { id: articleId },
	})
	invariantResponse(article, 'Not found', { status: 404 })

	const isOwner = article.ownerId === userId
	await requireUserWithPermission(
		request,
		isOwner ? `delete:article:own` : `delete:article:any`,
	)

	await prisma.article.delete({ where: { id: article.id } })

	return redirectWithToast(`/users/${article.owner.username}/articles`, {
		type: 'success',
		title: 'Success',
		description: 'Your article has been deleted.',
	})
}

export default function ArticleRoute() {
	const data = useLoaderData<typeof loader>()
	const user = useOptionalUser()
	const isOwner = user?.id === data.article.ownerId
	const canDelete = userHasPermission(
		user,
		isOwner ? `delete:article:own` : `delete:article:any`,
	)
	const displayBar = canDelete || isOwner

	return (
		<div className="absolute inset-0 flex flex-col px-10">
			<h2 className="mb-2 pt-12 text-h2 lg:mb-6">{data.article.title}</h2>
			<div className="mb-4">
				<p className="w-fit rounded-lg bg-card px-4 py-2 text-sm text-card-foreground">
					{data.article.category?.name ?? 'General News'}
				</p>
			</div>
			<div className={`${displayBar ? 'pb-24' : 'pb-12'} overflow-y-auto`}>
				<ul className="flex flex-wrap gap-5 py-5">
					{data.article.images.map(image => (
						<li key={image.id}>
							<a href={getArticleImgSrc(image.id)}>
								<img
									src={getArticleImgSrc(image.id)}
									alt={image.altText ?? ''}
									className="h-32 w-32 rounded-lg object-cover"
								/>
							</a>
						</li>
					))}
				</ul>
				<p className="whitespace-break-spaces text-sm md:text-lg">
					{data.article.content}
				</p>
			</div>
			{displayBar ? (
				<div className={floatingToolbarClassName}>
					<span className="text-sm text-foreground/90 max-[524px]:hidden">
						<Icon name="clock" className="scale-125">
							{data.timeAgo} ago
						</Icon>
					</span>
					<div className="grid flex-1 grid-cols-2 justify-end gap-2 min-[525px]:flex md:gap-4">
						{canDelete ? <DeleteArticle id={data.article.id} /> : null}
						<Button
							asChild
							className="min-[525px]:max-md:aspect-square min-[525px]:max-md:px-0"
						>
							<Link to="edit">
								<Icon name="pencil-1" className="scale-125 max-md:scale-150">
									<span className="max-md:hidden">Edit</span>
								</Icon>
							</Link>
						</Button>
					</div>
				</div>
			) : null}
		</div>
	)
}

export function DeleteArticle({ id }: { id: string }) {
	const actionData = useActionData<typeof action>()
	const isPending = useIsPending()
	const [form] = useForm({
		id: 'delete-article',
		lastResult: actionData?.result,
	})

	return (
		<Form method="POST" {...getFormProps(form)}>
			<input type="hidden" name="articleId" value={id} />
			<StatusButton
				type="submit"
				name="intent"
				value="delete-article"
				variant="destructive"
				status={isPending ? 'pending' : form.status ?? 'idle'}
				disabled={isPending}
				className="w-full max-md:aspect-square max-md:px-0"
			>
				<Icon name="trash" className="scale-125 max-md:scale-150">
					<span className="max-md:hidden">Delete</span>
				</Icon>
			</StatusButton>
			<ErrorList errors={form.errors} id={form.errorId} />
		</Form>
	)
}

export const meta: MetaFunction<
	typeof loader,
	{ 'routes/users+/$username_+/articles': typeof articlesLoader }
> = ({ data, params, matches }) => {
	const articlesMatch = matches.find(
		m => m.id === 'routes/users+/$username_+/articles',
	)
	const displayName = articlesMatch?.data?.owner.name ?? params.username
	const articleTitle = data?.article.title ?? 'Article'
	const articleContentsSummary =
		data && data.article.content.length > 100
			? data?.article.content.slice(0, 97) + '...'
			: 'No content'
	return [
		{ title: `${articleTitle} | ${displayName}'s Articles | Epic News` },
		{
			name: 'description',
			content: articleContentsSummary,
		},
	]
}

export function ErrorBoundary() {
	return (
		<GeneralErrorBoundary
			statusHandlers={{
				403: () => <p>You are not allowed to do that</p>,
				404: ({ params }) => (
					<p>No article with the id "{params.articleId}" exists</p>
				),
			}}
		/>
	)
}
