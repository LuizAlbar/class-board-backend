import { randomUUID } from "node:crypto";
import type { User } from "@/modules/auth/domain/entities/user-entity.ts";
import type {
	ICreateStudentDTO,
	IQueryStudentDTO,
	IQueryStudentResultDTO,
} from "@/modules/student/application/dtos/student-dto.ts";
import { Student } from "../../entities/student-entity.ts";
import type { IStudentsRepository } from "../students-repository.ts";

export class InMemoryStudentsRepository implements IStudentsRepository {
	public items: Student[] = [];
	public users: User[] = [];

	async findById(id: string) {
		const student = this.items.find((item) => item.id === id);
		if (!student) return null;

		return student;
	}
	async findStudents(query: IQueryStudentDTO) {
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

			const studentQuery = [];

			for (let i = startIndex; i < endIndex; i++) {
				const student = this.items[i];
				if (student.userId === item.id) {
					const obj: IQueryStudentResultDTO = {
						id: student.id,
						userId: student.userId,
						organizationId: student.organizationId,
						name: item.name,
						email: item.email,
						page: query.page,
						limit: query.limit,
					};
					studentQuery.push(obj);
				}
			}
			return studentQuery.slice(startIndex, endIndex);
		});

		if (!usersQuery) return null;

		return usersQuery[0];
	}
	async create(data: ICreateStudentDTO) {
		const newStudent = new Student({
			id: randomUUID(),
			userId: data.userId,
			ra: data.ra,
			dateOfBirth: data.dateOfBirth,
			organizationId: data.organizationId,
		});

		this.items.push(newStudent);
		return newStudent;
	}
	async delete(id: string) {
		const studentIndex = this.items.findIndex((item) => item.id === id);
		this.items.splice(studentIndex, 1);
	}
}
