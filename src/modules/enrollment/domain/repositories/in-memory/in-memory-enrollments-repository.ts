import { randomUUID } from "node:crypto";
import type { Class } from "@/modules/class/domain/entities/class-entity.ts";
import type {
	ICreateEnrollmentDTO,
	IQueryEnrollmentDTO,
	IQueryEnrollmentResultDTOV2,
	IUpdateEnrollmentDTO,
} from "@/modules/enrollment/application/dtos/enrollment-dto.ts";
import type { Student } from "@/modules/student/domain/entities/student-entity.ts";
import { Enrollment } from "../../entities/enrollment-entity.ts";
import type { IEnrollmentsRepository } from "../enrollments-repository.ts";

export class InMemoryEnrollmentsRepository implements IEnrollmentsRepository {
	public items: Enrollment[] = [];
	public students: Student[] = [];
	public classes: Class[] = [];

	async findById(id: string) {
		const enrollmentsItem = this.items.find((item) => item.id === id);

		if (!enrollmentsItem) return null;

		return enrollmentsItem;
	}

	findEnrollments(
		query: IQueryEnrollmentDTO,
	): Promise<IQueryEnrollmentResultDTOV2[] | null> {
		throw new Error("Method not implemented.");
	}
	async create(data: ICreateEnrollmentDTO) {
		const enrollmentItem = new Enrollment({
			id: randomUUID(),
			year: data.year,
			status: data.status,
			enrollmentDate: data.enrollmentDate,
			studentId: data.studentId,
			classId: data.classId,
		});
		this.items.push(enrollmentItem);
		return enrollmentItem;
	}
	async update(id: string, data: IUpdateEnrollmentDTO) {
		const enrollmentIndex = this.items.findIndex((item) => item.id === id);
		const updatedEnrollmentItem = new Enrollment({
			...this.items[enrollmentIndex].props,
			...data,
		});

		this.items[enrollmentIndex] = updatedEnrollmentItem;

		return updatedEnrollmentItem;
	}
	async delete(id: string) {
		const enrollmentIndex = this.items.findIndex((item) => item.id === id);
		this.items.splice(enrollmentIndex, 1);
	}
}
