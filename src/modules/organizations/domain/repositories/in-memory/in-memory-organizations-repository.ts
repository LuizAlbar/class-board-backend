import type { Organization } from "../../entities/organization-entity.ts";
import type { IOrganizationsRepository } from "../organizations-repository.ts";

export class InMemoryOrganizationsRepository
	implements IOrganizationsRepository
{
	public items: Organization[] = [];

	async findById(id: string) {
		const organization = this.items.find((item) => item.id === id);

		if (!organization) {
			return null;
		}

		return organization;
	}

	async create(organization: Organization) {
		this.items.push(organization);

		return organization;
	}
}
