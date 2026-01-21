import { BaseError } from "./base-error.ts";

export class BadRequestError extends BaseError {
	public readonly data: any;
	constructor(data: any) {
		super("Missing some data", 400, data);
		this.data = data;
	}
}
export class UnauthorizedUserError extends BaseError {
	constructor() {
		super("Unauthorized.", 401);
	}
}
export class ForbiddenAction extends BaseError {
	public readonly message: string;
	constructor(message: string = "Forbidden action.") {
		super(message, 403);
		this.message = message;
	}
}
