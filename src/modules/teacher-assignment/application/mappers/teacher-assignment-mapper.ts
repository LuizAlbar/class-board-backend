import type { TeacherAssignment as TeacherAssignmentClass } from "@prisma/client";
import { TeacherAssignment } from "../../domain/entities/teacher-assignment-entity.ts";
import type {
	ICreateTeacherAssignmentDTO,
	ITeacherAssignmentDTO,
} from "../dtos/teacher-assignment-dto.ts";

export class TeacherAssignmentMapper {
	static toDomain(raw: TeacherAssignmentClass): TeacherAssignment {
		return new TeacherAssignment({
			id: raw.id,
			workload: raw.workload,
			classId: raw.classId,
			teacherId: raw.teacherId,
			disciplineId: raw.disciplineId,
		});
	}

	static toPrisma(data: ICreateTeacherAssignmentDTO) {
		return {
			workload: data.workload,
			classId: data.classId,
			teacherId: data.teacherId,
			disciplineId: data.disciplineId,
		};
	}

	static toDTO(
		teacherAssignmentItem: TeacherAssignment,
	): ITeacherAssignmentDTO {
		return {
			id: teacherAssignmentItem.id,
			workload: teacherAssignmentItem.workload,
			classId: teacherAssignmentItem.classId,
			teacherId: teacherAssignmentItem.teacherId,
			disciplineId: teacherAssignmentItem.disciplineId,
		};
	}
}
