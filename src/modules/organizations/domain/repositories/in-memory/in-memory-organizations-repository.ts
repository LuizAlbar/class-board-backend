import type { Organization } from "../../entities/Organization.ts";
import type { OrganizationsRepository } from "../organizations-repository.ts";

export class InMemoryUsersRepository implements OrganizationsRepository {
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
