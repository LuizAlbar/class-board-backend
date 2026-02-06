import type {
	ICreateTeacherDTO,
	IQueryTeacherDTO,
	IQueryTeacherResultDTO,
} from "../../application/dtos/teacher-dto.ts";
import type { Teacher } from "../entities/teacher-entity.ts";

export interface ITeachersRepository {
	findById(id: string): Promise<Teacher | null>;
	findTeachers(
		query: IQueryTeacherDTO,
	): Promise<IQueryTeacherResultDTO[] | null>;
	create(data: ICreateTeacherDTO): Promise<Teacher>;
	delete(id: string): Promise<void>;
}
