import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import {
	Membership,
	Role,
} from "@/modules/membership/domain/entities/membership-entity.ts";
import { InMemoryMembershipsRepository } from "@/modules/membership/domain/repositories/in-memory/in-memory-memberships-repository.ts";
import { ForbiddenActionError } from "@/shared/errors/http-errors.ts";
import { CreateOrganizationSessionUseCase } from "./create-organization-session-use-case.ts";
import { AccessTokenServiceMock } from "./mocks/access-token-service-mock.ts";

let membershipsRepository: InMemoryMembershipsRepository;
let sut: CreateOrganizationSessionUseCase;
const accessTokenService = new AccessTokenServiceMock();

const membershipData = new Membership({
	id: randomUUID(),
	userId: "user-id",
	organizationId: "org-id",
	role: Role.ESTUDANTE,
	created_at: new Date(),
	updated_at: new Date(),
});

describe("Create Organizaztion Session Use Case", () => {
	beforeEach(() => {
		membershipsRepository = new InMemoryMembershipsRepository();
		sut = new CreateOrganizationSessionUseCase(
			membershipsRepository,
			accessTokenService,
		);
	});

	it("should be able to create an organization session", async () => {
		await membershipsRepository.create(membershipData);

		const membership = await sut.execute({
			userId: membershipData.userId,
			organizationId: membershipData.organizationId,
		});

		expect(membership).toEqual(expect.any(String));
	});

	it("should not be possible to access a prohibited organization", async () => {
		await membershipsRepository.create(membershipData);

		await expect(() =>
			sut.execute({
				userId: membershipData.userId,
				organizationId: "fake-org-id",
			}),
		).rejects.toBeInstanceOf(ForbiddenActionError);
	});
});
