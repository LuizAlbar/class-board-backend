import { randomUUID } from "node:crypto";
import { Organization } from "../../domain/entities/Organization.ts";

import type { OrganizationsRepository } from "../../domain/repositories/organizations-repository.ts";
import type { CreateOrganizationDTO } from "../dtos/organization-dto.ts";

export class CreateOrganizationUseCase {
	constructor(private organizationRepository: OrganizationsRepository) {}

	async execute(dto: CreateOrganizationDTO) {
		const newOrganization = new Organization({
			id: randomUUID(),
			name: dto.name,
			slug: dto.slug,
			created_at: new Date(),
		});

		const organization = await this.organizationRepository.create(newOrganization);

		return { organization };
	}
}
