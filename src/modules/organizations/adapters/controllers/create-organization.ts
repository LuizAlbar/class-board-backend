import type { FastifyReply, FastifyRequest } from "fastify";
import { FastifyResponsePresenter } from "@/shared/utils/response-handler/fastify-response-presenter.ts";
import { OrganizationMapper } from "../../application/mappers/organization-mapper.ts";
import { createOrganizationSchema } from "../../application/validators/organization-validator.ts";
import { makeCreateOrganizationUseCase } from "../../infrastructure/factories/make-create-organization-use-case.ts";

export async function createOrganization(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { name, slug } = createOrganizationSchema.parse(request.body);

	try {
		const createOrganizationUseCase = makeCreateOrganizationUseCase();

		const { organization } = await createOrganizationUseCase.execute({
			name,
			slug,
		});

		return FastifyResponsePresenter.success(
			reply,
			201,
			"Organization created successfully",
			OrganizationMapper.toDTO(organization),
		);
	} catch (err) {
		if (err) {
			throw err;
		}
	}
}
