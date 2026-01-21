import { BaseError } from "@/shared/errors/base-error.ts";

export class UserAlreadyExists extends BaseError {
	constructor() {
		super("Email already exists", 409);
	}
}
