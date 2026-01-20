import { compare, hash } from "bcryptjs";
import type { IHashService } from "../../domain/services/hash-service.ts";

export class BcryptHashService implements IHashService {
	async hash(value: string) {
		return hash(value, 8);
	}
	async compare(password: string, userPassword: string) {
		return compare(password, userPassword);
	}
}
