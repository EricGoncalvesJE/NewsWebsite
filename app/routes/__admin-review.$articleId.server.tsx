import { prisma } from '#app/utils/db.server.js'
import { redirectWithToast } from '#app/utils/toast.server.js'
import { parseWithZod } from '@conform-to/zod'
import { invariantResponse } from '@epic-web/invariant'
import { LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/react'
import { formatDistanceToNow } from 'date-fns'
import { z } from 'zod'

export async function loader({ params }: LoaderFunctionArgs) {
    invariantResponse(params.articleId, 'No article ID provided', { status: 404 })

    const article = await prisma.article.findUnique({
        where: { id: params.articleId },
        select: {
            id: true,
            title: true,
            content: true,
            ownerId: true,
            updatedAt: true,
            publishedAt: true,
            isPublished: true,
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

    const updatedAtDate = new Date(article.updatedAt)
    const publishedAtDate = article.publishedAt
        ? new Date(article.publishedAt)
        : null
    const timeAgoUpdated = formatDistanceToNow(updatedAtDate)
    const timeAgoPublished = publishedAtDate
        ? formatDistanceToNow(publishedAtDate)
        : null

    return json({
        article,
        timeAgoUpdated,
        timeAgoPublished,
    })
}

export const PublishArticleSchema = z.object({
    publish: z.optional(z.string()),
    unpublish: z.optional(z.string()),
})

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData()

    const submission = await parseWithZod(formData, {
        schema: PublishArticleSchema.superRefine(async (data, ctx) => {
            if (!data.publish && !data.unpublish) return

            const article = await prisma.article.findUnique({
                select: { id: true },
                where: { id: data.publish ?? data.unpublish },
            })

            if (!article) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Article not found',
                })
            }
        }).transform(async data => {
            return {
                ...data,
                publishedAt: new Date(),
                isPublished: data.publish ? true : false,
            }
        }),
        async: true,
    })

    if (submission.status !== 'success') {
        return json(
            { result: submission.reply() },
            { status: submission.status === 'error' ? 400 : 200 },
        )
    }

    const { publish, unpublish } = submission.value

    const updatedArticle = await prisma.article.update({
        where: { id: publish ?? unpublish },
        data: {
            isPublished: publish ? true : false,
            publishedAt: publish ? new Date() : null,
        },
    })

    return redirectWithToast(`/admin-review/${updatedArticle.id}`, {
        type: 'success',
        title: 'Success',
        description: `The article has been ${publish ? 'published' : 'unpublished'}`,
    })
}