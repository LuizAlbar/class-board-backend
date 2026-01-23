import "fastify";

declare module "fastify" {
	export interface FastifyRequest {
		getCurrentOrganizationId(): string;
		getCurrentMembership(): any;
	}
}
