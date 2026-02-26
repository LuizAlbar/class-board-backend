import type { Enrollment as EnrollmentClass } from "@prisma/client";
import {
	Enrollment,
	type Status,
} from "../../domain/entities/enrollment-entity.ts";
import type {
	ICreateEnrollmentDTO,
	IEnrollmentDTO,
	IQueryEnrollmentResultDTOV2,
} from "../dtos/enrollment-dto.ts";

export class EnrollmentMapper {
	static toDomain(raw: EnrollmentClass): Enrollment {
		return new Enrollment({
			id: raw.id,
			year: raw.year,
			status: raw.status as Status,
			enrollmentDate: raw.enrollmentDate,
			studentId: raw.studentId,
			classId: raw.classId,
		});
	}

	static toPrisma(data: ICreateEnrollmentDTO) {
		return {
			year: data.year,
			status: data.status,
			enrollmentDate: data.enrollmentDate,
			studentId: data.studentId,
			classId: data.classId,
		};
	}

	static toDTO(enrollmentItem: Enrollment): IEnrollmentDTO {
		return {
			id: enrollmentItem.id,
			status: enrollmentItem.status,
			year: enrollmentItem.year,
			enrollmentDate: enrollmentItem.enrollmentDate,
			studentId: enrollmentItem.studentId,
			classId: enrollmentItem.classId,
		};
	}

	static toManyQueryDTOV2(
		enrollmentQuery: any[],
	): IQueryEnrollmentResultDTOV2[] {
		return enrollmentQuery.map((enrollment) => ({
			id: enrollment.id,
			year: enrollment.year,
			status: enrollment.status,
			enrollmentDate: enrollment.enrollmentDate,
			student: enrollment.student,
			class: enrollment.class,
		}));
	}
}
