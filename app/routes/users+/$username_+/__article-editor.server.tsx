import { parseWithZod } from '@conform-to/zod'
import { createId as cuid } from '@paralleldrive/cuid2'
import {
	unstable_createMemoryUploadHandler as createMemoryUploadHandler,
	json,
	unstable_parseMultipartFormData as parseMultipartFormData,
	redirect,
	type ActionFunctionArgs,
} from '@remix-run/node'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import {
	MAX_UPLOAD_SIZE,
	ArticleEditorSchema,
	type ImageFieldset,
} from './__article-editor'

function imageHasFile(
	image: ImageFieldset,
): image is ImageFieldset & { file: NonNullable<ImageFieldset['file']> } {
	return Boolean(image.file?.size && image.file?.size > 0)
}

function imageHasId(
	image: ImageFieldset,
): image is ImageFieldset & { id: NonNullable<ImageFieldset['id']> } {
	return image.id != null
}

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)

	const formData = await parseMultipartFormData(
		request,
		createMemoryUploadHandler({ maxPartSize: MAX_UPLOAD_SIZE }),
	)

	const submission = await parseWithZod(formData, {
		schema: ArticleEditorSchema.superRefine(async (data, ctx) => {
			if (!data.id) return

			const article = await prisma.article.findUnique({
				select: { id: true },
				where: { id: data.id, ownerId: userId },
			})

			if (!article) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Article not found',
				})
			}
		}).transform(async ({ images = [], ...data }) => {
			return {
				...data,
				imageUpdates: await Promise.all(
					images.filter(imageHasId).map(async i => {
						if (imageHasFile(i)) {
							return {
								id: i.id,
								altText: i.altText,
								contentType: i.file.type,
								blob: Buffer.from(await i.file.arrayBuffer()),
							}
						} else {
							return {
								id: i.id,
								altText: i.altText,
							}
						}
					}),
				),
				newImages: await Promise.all(
					images
						.filter(imageHasFile)
						.filter(i => !i.id)
						.map(async image => {
							return {
								altText: image.altText,
								contentType: image.file.type,
								blob: Buffer.from(await image.file.arrayBuffer()),
							}
						}),
				),
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

	const {
		id: articleId,
		title,
		content,
		categoryId,
		imageUpdates = [],
		newImages = [],
	} = submission.value

	const updatedArticle = await prisma.article.upsert({
		select: { id: true, owner: { select: { username: true } } },
		where: { id: articleId ?? '__new_article__' },
		create: {
			ownerId: userId,
			title,
			content,
			categoryId,
			images: { create: newImages },
		},
		update: {
			title,
			content,
			categoryId,
			images: {
				deleteMany: { id: { notIn: imageUpdates.map(i => i.id) } },
				updateMany: imageUpdates.map(updates => ({
					where: { id: updates.id },
					data: { ...updates, id: updates.blob ? cuid() : updates.id },
				})),
				create: newImages,
			},
		},
	})

	return redirect(
		`/users/${updatedArticle.owner.username}/articles/${updatedArticle.id}`,
	)
}
