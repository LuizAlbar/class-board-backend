import { randomUUID } from "node:crypto";
import type {
	ICreateTeacherAssignmentDTO,
	IUpdateTeacherAssignmentDTO,
} from "@/modules/teacher-assignment/application/dtos/teacher-assignment-dto.ts";
import { TeacherAssignment } from "../../entities/teacher-assignment-entity.ts";
import type { ITeacherAssignmentsRepository } from "../teacher-assignment-repository.ts";

export class InMemoryTeacherAssignmentsRepository
	implements ITeacherAssignmentsRepository
{
	public items: TeacherAssignment[] = [];

	async findById(id: string) {
		const teacherAssignmentsItem = this.items.find((item) => item.id === id);

		if (!teacherAssignmentsItem) return null;

		return teacherAssignmentsItem;
	}
	async create(data: ICreateTeacherAssignmentDTO) {
		const teacherAssignmentItem = new TeacherAssignment({
			id: randomUUID(),
			workload: data.workload,
			classId: data.classId,
			teacherId: data.teacherId,
			disciplineId: data.disciplineId,
		});
		this.items.push(teacherAssignmentItem);
		return teacherAssignmentItem;
	}
	async update(id: string, data: IUpdateTeacherAssignmentDTO) {
		const teacherAssignmentIndex = this.items.findIndex(
			(item) => item.id === id,
		);
		const updatedTeacherAssignmentItem = new TeacherAssignment({
			...this.items[teacherAssignmentIndex].props,
			...data,
		});

		this.items[teacherAssignmentIndex] = updatedTeacherAssignmentItem;

		return updatedTeacherAssignmentItem;
	}
	async delete(id: string) {
		const teacherAssignmentIndex = this.items.findIndex(
			(item) => item.id === id,
		);
		this.items.splice(teacherAssignmentIndex, 1);
	}
}
