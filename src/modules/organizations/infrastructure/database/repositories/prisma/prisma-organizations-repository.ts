import type { ICreateOrganizationDTO } from "@/modules/organizations/application/dtos/organization-dto.ts";
import { OrganizationMapper } from "@/modules/organizations/application/mappers/organization-mapper.ts";
import type { IOrganizationsRepository } from "@/modules/organizations/domain/repositories/organizations-repository.ts";
import { prisma } from "@/shared/database/prisma.ts";

export class PrismaOrganizationsRepository implements IOrganizationsRepository {
	async findById(id: string) {
		const organization = await prisma.organization.findUnique({
			where: { id },
		});
		if (!organization) {
			return null;
		}

		return OrganizationMapper.toDomain(organization);
	}

	async create(data: ICreateOrganizationDTO) {
		const organization = await prisma.organization.create({
			data: OrganizationMapper.toPrisma(data),
		});

		return OrganizationMapper.toDomain(organization);
	}
}
