import type { Teacher as PrismaTeacher } from "@prisma/client";
import type { User } from "@/modules/auth/domain/entities/user-entity.ts";
import { Teacher } from "../../domain/entities/teacher-entity.ts";
import type {
	ICreateTeacherDTO,
	IQueryTeacherResultDTO,
	IQueryTeacherResultDTOV2,
	ITeacherDTO,
} from "../dtos/teacher-dto.ts";

export class TeacherMapper {
	static toDomain(raw: PrismaTeacher): Teacher {
		return new Teacher({
			id: raw.id,
			userId: raw.userId,
			organizationId: raw.organizationId,
		});
	}

	static toPrisma(data: ICreateTeacherDTO) {
		return {
			userId: data.userId,
			organizationId: data.organizationId,
		};
	}

	static toDTO(teacher: Teacher): ITeacherDTO {
		return {
			id: teacher.id,
			userId: teacher.userId,
			organizationId: teacher.organizationId,
		};
	}

	static toManyQueryDTO(
		teachers: Teacher[],
		users: User[],
	): IQueryTeacherResultDTO[] {
		return teachers.map((teacher) => {
			const user = users.find((u) => u.id === teacher.userId);

			return {
				id: teacher.id,
				userId: teacher.userId,
				organizationId: teacher.organizationId,
				name: user?.name,
				email: user?.email,
				page: 1,
				limit: 10,
			};
		});
	}

	static toManyQueryDTOV2(teacherQuery: any[]): IQueryTeacherResultDTOV2[] {
		return teacherQuery.map((teacher) => ({
			id: teacher.id,
			userId: teacher.userId,
			organizationId: teacher.organizationId,
			membership: {
				...teacher.membership,
				user: {
					...teacher.membership.user,
				},
			},
		}));
	}
}
