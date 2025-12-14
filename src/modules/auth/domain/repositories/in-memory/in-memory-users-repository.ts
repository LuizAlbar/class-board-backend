import { randomUUID } from "node:crypto";
import { User, UserRole } from "../../entities/User.ts";
import type { UsersRepository } from "../users-repository.ts";

export class InMemoryUsersRepository implements UsersRepository {
	public items: User[] = [];

	async findById(id: string) {
		const user = this.items.find((item) => item.id === id);

		if (!user) {
			return null;
		}

		return user;
	}

	async findByEmail(email: string) {
		const user = this.items.find((item) => item.email === email);

		if (!user) {
			return null;
		}

		return user;
	}
	async create(data: User) {
		const user = new User({
			id: randomUUID(),
			name: data.name,
			email: data.email,
			password: data.password,
			created_at: new Date(),
			updated_at: new Date(),
			role: UserRole.ESTUDANTE,
		});

		this.items.push(user);

		return user;
	}
	async update(data: User) {
		const index = this.items.findIndex((u) => u.id === data.id);

		if (index === -1) {
			throw Error;
		}
		this.items[index] = data;

		return data;
	}
	async delete(id: string) {
		const index = this.items.findIndex((u) => u.id === id);

		if (index === -1) {
			throw Error;
		}

		this.items.splice(index, 1);
	}
}
