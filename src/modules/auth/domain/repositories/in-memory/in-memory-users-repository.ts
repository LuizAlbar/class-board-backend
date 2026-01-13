import type { User } from "../../entities/User.ts";
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
	async create(user: User) {
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
