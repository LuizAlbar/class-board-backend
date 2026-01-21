import { BaseError } from "@/shared/errors/base-error.ts";

export class InvalidCredentialError extends BaseError {
	constructor() {
		super("Invalid credentials.", 401);
	}
}
