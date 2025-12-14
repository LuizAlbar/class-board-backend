import bcrypt from "bcryptjs";
import type { HashService } from "../../domain/services/HashService.ts";

export class BcryptHashService implements HashService {
	async hash(value: string) {
		return bcrypt.hash(value, 8);
	}
}
