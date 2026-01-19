import type { CreateOrganizationDTO } from "../../application/dtos/organization-dto.ts";
import type { Organization } from "../entities/Organization.ts";

export interface OrganizationsRepository {
	findById(id: string): Promise<Organization | null>;
	create(data: CreateOrganizationDTO): Promise<Organization>;
}
