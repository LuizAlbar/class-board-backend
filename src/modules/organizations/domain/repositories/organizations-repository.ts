import type { ICreateOrganizationDTO } from "../../application/dtos/organization-dto.ts";
import type { Organization } from "../entities/organization-entity.ts";

export interface IOrganizationsRepository {
	findById(id: string): Promise<Organization | null>;
	create(data: ICreateOrganizationDTO): Promise<Organization>;
}
