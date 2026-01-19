import type {
	CreateMembershipDTO,
	findUserMembershipDTO,
} from "@/modules/membership/application/dtos/membership-dto.ts";
import { MembershipMapper } from "@/modules/membership/application/mappers/membership-mapper.ts";
import type { Membership } from "@/modules/membership/domain/entities/Membership.ts";
import type { MembershipsRepository } from "@/modules/membership/domain/repositories/memberships-repository.ts";
import { prisma } from "@/shared/database/prisma.ts";

export class PrismaMembershipsRepository implements MembershipsRepository {
	async findById(id: string) {
		const membership = await prisma.membership.findUnique({
			where: { id },
		});
		if (!membership) {
			return null;
		}

		return MembershipMapper.toDomain(membership);
	}

	async create(data: CreateMembershipDTO) {
		const membership = await prisma.membership.create({
			data: MembershipMapper.toPrisma(data),
		});

		return MembershipMapper.toDomain(membership);
	}

	async findUserInAOrganization(
		data: findUserMembershipDTO,
	): Promise<Membership | null> {
		const membership = await prisma.membership.findFirst({
			where: { userId: data.userId, organizationId: data.organizationId },
		});

		if (!membership) {
			return null;
		}

		return MembershipMapper.toDomain(membership);
	}
}
