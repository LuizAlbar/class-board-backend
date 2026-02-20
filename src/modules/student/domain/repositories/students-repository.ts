import type {
	ICreateStudentDTO,
	IQueryStudentDTO,
	IQueryStudentResultDTOV2,
} from "../../application/dtos/student-dto.ts";
import type { Student } from "../entities/student-entity.ts";

export interface IStudentsRepository {
	findById(id: string): Promise<Student | null>;
	findStudents(
		query: IQueryStudentDTO,
	): Promise<IQueryStudentResultDTOV2[] | null>;
	create(data: ICreateStudentDTO): Promise<Student>;
	delete(id: string): Promise<void>;
}
