export class ForbiddenOrganizationError extends Error {
	constructor() {
		super("You are not allowed in this organization.");
	}
}
