import type { ICreateUserDTO } from "../../application/dtos/user-dto.ts";
import type { User } from "../entities/user-entity.ts";

export interface IUsersRepository {
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	create(data: ICreateUserDTO): Promise<User>;
	update(data: User): Promise<User>;
	delete(id: string): Promise<void>;
}
