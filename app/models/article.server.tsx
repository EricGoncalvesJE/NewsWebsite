import { prisma } from '~/utils/db.server.js'

export async function getAllArticles() {
	return await prisma.article.findMany({
		select: {
			id: true,
			title: true,
			category: { select: { name: true } },
			images: { select: { id: true } },
		},
		orderBy: {
			createdAt: 'desc',
		},
	})
}

export async function getFilteredArticles(category: string) {
	return await prisma.article.findMany({
		where: {
			category: {
				slug: category,
			},
		},
		select: {
			id: true,
			title: true,
			category: { select: { name: true } },
			images: { select: { id: true } },
		},
		orderBy: {
			createdAt: 'desc',
		},
		take: 9, // Limits the number of articles returned
	})
}

export async function getSingleArticle(articleId: string) {
	return await prisma.article.findUnique({
		where: { id: articleId, isPublished: true },
		select: {
			id: true,
			title: true,
			content: true,
			category: { select: { name: true } },
			owner: { select: { name: true } },
			images: { select: { id: true } },
		},
	})
}

export async function getPublishedArticlesByCategory(category: string) {
	return await prisma.article.findMany({
		where: {
			category: {
				slug: category,
			},
			isPublished: true,
		},
		select: {
			id: true,
			title: true,
			category: { select: { name: true } },
			images: { select: { id: true } },
		},
		orderBy: {
			createdAt: 'desc',
		},
		take: 9, // Limits the number of articles returned
	})
}
