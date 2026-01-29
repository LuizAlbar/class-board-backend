import { prisma } from "@/shared/database/prisma.ts";

export async function createFullMembership(userBody: any) {
	const userId = userBody.body.data.id;

	const organization = await prisma.organization.create({
		data: { name: "Test School", slug: "test-school" },
	});

	const membership = await prisma.membership.create({
		data: {
			organizationId: organization.id,
			userId: userId,
			role: "COORDENADOR",
		},
	});

	return membership;
}
