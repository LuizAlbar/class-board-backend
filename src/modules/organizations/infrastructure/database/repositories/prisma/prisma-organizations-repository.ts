import type { CreateOrganizationDTO } from "@/modules/organizations/application/dtos/organization-dto.ts";
import { OrganizationMapper } from "@/modules/organizations/application/mappers/organization-mapper.ts";
import type { OrganizationsRepository } from "@/modules/organizations/domain/repositories/organizations-repository.ts";
import { prisma } from "@/shared/database/prisma.ts";

export class PrismaOrganizationsRepository implements OrganizationsRepository {
	async findById(id: string) {
		const organization = await prisma.organization.findUnique({
			where: { id },
		});
		if (!organization) {
			return null;
		}

		return OrganizationMapper.toDomain(organization);
	}

	async create(data: CreateOrganizationDTO) {
		const organization = await prisma.organization.create({
			data: OrganizationMapper.toPrisma(data),
		});

		return OrganizationMapper.toDomain(organization);
	}
}
