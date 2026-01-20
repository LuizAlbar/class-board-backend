import { beforeEach, describe, expect, it } from "vitest";
import { Role } from "../../domain/entities/membership-entity.ts";
import { InMemoryMembershipsRepository } from "../../domain/repositories/in-memory/in-memory-memberships-repository.ts";
import { CreateMembershipUseCase } from "./create-membership-use-case.ts";

let membershipsRepository: InMemoryMembershipsRepository;
let sut: CreateMembershipUseCase;

const membershipData = {
	role: Role.ESTUDANTE,
	userId: "123",
	organizationId: "12345",
};
describe("Create Membership Use Case", () => {
	beforeEach(() => {
		membershipsRepository = new InMemoryMembershipsRepository();
		sut = new CreateMembershipUseCase(membershipsRepository);
	});

	it("should be able to create a membership", async () => {
		const { membership } = await sut.execute(membershipData);
		expect(membership.id).toEqual(expect.any(String));
	});
});
