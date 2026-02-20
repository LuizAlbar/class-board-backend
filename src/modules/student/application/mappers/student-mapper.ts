import type { Student as PrismaStudent } from "@prisma/client";
import type { User } from "@/modules/auth/domain/entities/user-entity.ts";
import { Student } from "../../domain/entities/student-entity.ts";
import type {
	ICreateStudentDTO,
	IQueryStudentResultDTO,
	IQueryStudentResultDTOV2,
	IStudentDTO,
} from "../dtos/student-dto.ts";

export class StudentMapper {
	static toDomain(raw: PrismaStudent): Student {
		return new Student({
			id: raw.id,
			userId: raw.userId,
			ra: raw.ra,
			dateOfBirth: raw.dateOfBirth,
			organizationId: raw.organizationId,
		});
	}

	static toPrisma(data: ICreateStudentDTO) {
		return {
			userId: data.userId,
			ra: data.ra,
			dateOfBirth: data.dateOfBirth,
			organizationId: data.organizationId,
		};
	}

	static toDTO(student: Student): IStudentDTO {
		return {
			id: student.id,
			userId: student.userId,
			ra: student.ra,
			dateOfBirth: student.dateOfBirth,
			organizationId: student.organizationId,
		};
	}

	static toManyQueryDTO(
		students: Student[],
		users: User[],
	): IQueryStudentResultDTO[] {
		return students.map((student) => {
			const user = users.find((u) => u.id === student.userId);

			return {
				id: student.id,
				userId: student.userId,
				ra: student.ra,
				organizationId: student.organizationId,
				name: user?.name,
				email: user?.email,
				page: 1,
				limit: 10,
			};
		});
	}

	static toManyQueryDTOV2(studentQuery: any[]): IQueryStudentResultDTOV2[] {
		return studentQuery.map((student) => ({
			id: student.id,
			userId: student.userId,
			ra: student.ra,
			dateOfBirth: student.dateOfBirth,
			organizationId: student.organizationId,
			membership: {
				...student.membership,
				user: {
					...student.membership.user,
				},
			},
		}));
	}
}
