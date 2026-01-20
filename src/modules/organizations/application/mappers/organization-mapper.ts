import type { Organization as PrismaOrganization } from "@prisma/client";
import { Organization } from "../../domain/entities/organization-entity.ts";
import type {
	ICreateOrganizationDTO,
	IOrganizationDTO,
} from "../dtos/organization-dto.ts";

export class OrganizationMapper {
	static toDomain(raw: PrismaOrganization): Organization {
		return new Organization({
			id: raw.id,
			name: raw.name,
			slug: raw.slug,
			created_at: raw.created_at,
		});
	}

	static toPrisma(data: ICreateOrganizationDTO) {
		return {
			name: data.name,
			slug: data.slug,
		};
	}

	static toDTO(organization: Organization): IOrganizationDTO {
		return {
			id: organization.id,
			name: organization.name,
			slug: organization.slug,
			created_at: organization.created_at,
		};
	}
}
