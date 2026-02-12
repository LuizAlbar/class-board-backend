import { randomUUID } from "node:crypto";
import type { User } from "@/modules/auth/domain/entities/user-entity.ts";
import type {
	ICreateTeacherDTO,
	IQueryTeacherDTO,
	IQueryTeacherResultDTO,
} from "@/modules/teacher/application/dtos/teacher-dto.ts";
import { Teacher } from "../../entities/teacher-entity.ts";
import type { ITeachersRepository } from "../teachers-repository.ts";

export class InMemoryTeachersRepository implements ITeachersRepository {
	public items: Teacher[] = [];
	public users: User[] = [];

	async findById(id: string) {
		const teacher = this.items.find((item) => item.id === id);
		if (!teacher) return null;

		return teacher;
	}
	async findTeachers(query: IQueryTeacherDTO) {
		const pageSize = query.limit;
		const startIndex = (query.page - 1) * pageSize;
		const endIndex = startIndex + pageSize;

		const usersQuery = this.users.map((item) => {
			if (query.name) {
				item.name.includes(query.name);
			}
			if (query.email) {
				item.email.includes(query.email);
			}

			const teacherQuery = [];

			for (let i = startIndex; i < endIndex; i++) {
				const teacher = this.items[i];
				if (teacher.userId === item.id) {
					const obj: IQueryTeacherResultDTO = {
						id: teacher.id,
						userId: teacher.userId,
						organizationId: teacher.organizationId,
						name: item.name,
						email: item.email,
						page: query.page,
						limit: query.limit,
					};
					teacherQuery.push(obj);
				}
			}
			return teacherQuery.slice(startIndex, endIndex);
		});

		if (!usersQuery) return null;

		return usersQuery[0];
	}
	async create(data: ICreateTeacherDTO) {
		const newTeacher = new Teacher({
			id: randomUUID(),
			userId: data.userId,
			organizationId: data.organizationId,
		});

		this.items.push(newTeacher);
		return newTeacher;
	}
	async delete(id: string) {
		const teacherIndex = this.items.findIndex((item) => item.id === id);
		this.items.splice(teacherIndex, 1);
	}
}
