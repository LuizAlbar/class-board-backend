import { BaseError } from "./base-error.ts";

export class BadRequestError extends BaseError {
	public readonly data: any;
	constructor(data: any) {
		super("Missing some data", 400, data);
		this.data = data;
	}
}
export class UnauthorizedError extends BaseError {
	constructor() {
		super("Unauthorized.", 401);
	}
}
export class ForbiddenActionError extends BaseError {
	public readonly message: string;
	constructor(message: string = "Forbidden action.") {
		super(message, 403);
		this.message = message;
	}
}

export class ResourceNotFoundError extends BaseError {
	public readonly resource: string;
	constructor(resource: string = "Resource not found.") {
		super(resource, 404);
		this.resource = resource;
	}
}
