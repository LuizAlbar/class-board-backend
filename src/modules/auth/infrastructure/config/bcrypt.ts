import { compare, hash } from "bcryptjs";
import type { HashService } from "../../domain/services/HashService.ts";

export class BcryptHashService implements HashService {
	async hash(value: string) {
		return hash(value, 8);
	}
	async compare(password: string, userPassword: string) {
		return compare(password, userPassword);
	}
}
