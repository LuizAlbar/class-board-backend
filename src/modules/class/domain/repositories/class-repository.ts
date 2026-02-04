import type {
	ICreateClassDTO,
	IUpdateClassDTO,
} from "../../application/dtos/class-dto.ts";
import type { Class } from "../entities/class-entity.ts";

export interface IClassesRepository {
	findById(id: string): Promise<Class | null>;
	create(data: ICreateClassDTO): Promise<Class>;
	update(id: string, data: IUpdateClassDTO): Promise<Class>;
	delete(id: string): Promise<void>;
}
