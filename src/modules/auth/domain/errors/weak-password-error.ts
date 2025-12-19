export class WeakPasswordError extends Error {
	constructor() {
		super("Password too short");
	}
}
