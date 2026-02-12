import type {
	ICreateTeacherDTO,
	IQueryTeacherDTO,
	IQueryTeacherResultDTOV2,
} from "../../application/dtos/teacher-dto.ts";
import type { Teacher } from "../entities/teacher-entity.ts";

export interface ITeachersRepository {
	findById(id: string): Promise<Teacher | null>;
	findTeachers(
		query: IQueryTeacherDTO,
	): Promise<IQueryTeacherResultDTOV2[] | null>;
	create(data: ICreateTeacherDTO): Promise<Teacher>;
	delete(id: string): Promise<void>;
}
