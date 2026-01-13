export class UnauthorizedUserError extends Error {
	constructor() {
		super("Unauthorized.");
	}
}
