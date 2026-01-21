import { BaseError } from "@/shared/errors/base-error.ts";

export class InvalidCookieError extends BaseError {
	constructor() {
		super("Invalid cookies.", 401);
	}
}
