import type {
	ICreateTeacherAssignmentDTO,
	IUpdateTeacherAssignmentDTO,
} from "../../application/dtos/teacher-assignment-dto.ts";
import type { TeacherAssignment } from "../entities/teacher-assignment-entity.ts";

export interface ITeacherAssignmentsRepository {
	findById(id: string): Promise<TeacherAssignment | null>;
	create(data: ICreateTeacherAssignmentDTO): Promise<TeacherAssignment>;
	update(
		id: string,
		data: IUpdateTeacherAssignmentDTO,
	): Promise<TeacherAssignment>;
	delete(id: string): Promise<void>;
}
