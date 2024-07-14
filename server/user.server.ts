import { prisma } from '~/utils/db.server.ts'

export const getUser = async (userId: string) =>
	prisma.user.findUniqueOrThrow({
		select: {
			id: true,
			name: true,
			username: true,
			image: { select: { id: true } },
			roles: {
				select: {
					name: true,
					permissions: {
						select: { entity: true, action: true, access: true },
					},
				},
			},
		},
		where: { id: userId },
	})
