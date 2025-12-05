import type { User } from "../entities/User.ts";

export interface UsersRepository {
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	create(data: User): Promise<User>;
	update(data: User): Promise<User>;
	delete(id: string): Promise<void>;
}
