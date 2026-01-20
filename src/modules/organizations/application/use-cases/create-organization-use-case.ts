import { randomUUID } from "node:crypto";
import { Organization } from "../../domain/entities/organization-entity.ts";

import type { IOrganizationsRepository } from "../../domain/repositories/organizations-repository.ts";
import type { ICreateOrganizationDTO } from "../dtos/organization-dto.ts";

export class CreateOrganizationUseCase {
	constructor(private organizationRepository: IOrganizationsRepository) {}

	async execute(dto: ICreateOrganizationDTO) {
		const newOrganization = new Organization({
			id: randomUUID(),
			name: dto.name,
			slug: dto.slug,
			created_at: new Date(),
		});

		const organization =
			await this.organizationRepository.create(newOrganization);

		return { organization };
	}
}
