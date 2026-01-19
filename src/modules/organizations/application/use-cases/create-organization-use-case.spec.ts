import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrganizationsRepository } from "../../domain/repositories/in-memory/in-memory-organizations-repository.ts";
import { CreateOrganizationUseCase } from "./create-organization-use-case.ts";

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: CreateOrganizationUseCase;

const orgData = {
	name: "Escola 123",
	slug: "escola-123",
};
describe("Create Organization Use Case", () => {
	beforeEach(() => {
		organizationsRepository = new InMemoryOrganizationsRepository();
		sut = new CreateOrganizationUseCase(organizationsRepository);
	});

	it("should be able to create an organization", async () => {
		const { organization } = await sut.execute(orgData);
		expect(organization.id).toEqual(expect.any(String));
	});
});
