import type {
	ICreateMembershipDTO,
	IFindUserMembershipDTO,
} from "@/modules/membership/application/dtos/membership-dto.ts";
import { MembershipMapper } from "@/modules/membership/application/mappers/membership-mapper.ts";
import type { Membership } from "@/modules/membership/domain/entities/membership-entity.ts";
import type { IMembershipsRepository } from "@/modules/membership/domain/repositories/memberships-repository.ts";
import { prisma } from "@/shared/database/prisma.ts";

export class PrismaMembershipsRepository implements IMembershipsRepository {
	async findById(id: string) {
		const membership = await prisma.membership.findUnique({
			where: { id },
		});
		if (!membership) {
			return null;
		}

		return MembershipMapper.toDomain(membership);
	}

	async create(data: ICreateMembershipDTO) {
		const membership = await prisma.membership.create({
			data: MembershipMapper.toPrisma(data),
		});

		return MembershipMapper.toDomain(membership);
	}

	async findUserAndOrganization(
		data: IFindUserMembershipDTO,
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
