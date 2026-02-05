import type {
	ICreateDisciplineDTO,
	IUpdateDisciplineDTO,
} from "../../application/dtos/discipline-dto.ts";
import type { Discipline } from "../entities/discipline-entity.ts";

export interface IDisciplinesRepository {
	findById(id: string): Promise<Discipline | null>;
	findByName(query: string): Promise<Discipline[] | null>;
	create(data: ICreateDisciplineDTO): Promise<Discipline>;
	update(id: string, data: IUpdateDisciplineDTO): Promise<Discipline>;
	delete(id: string): Promise<void>;
}
