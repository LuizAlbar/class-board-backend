import { BaseError } from "@/shared/errors/base-error.ts";

export class WeakPasswordError extends BaseError {
	constructor() {
		super("Password too short", 400);
	}
}
