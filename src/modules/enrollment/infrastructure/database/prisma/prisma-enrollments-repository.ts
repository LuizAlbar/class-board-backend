import type {
	ICreateEnrollmentDTO,
	IQueryEnrollmentDTO,
	IQueryEnrollmentResultDTOV2,
	IUpdateEnrollmentDTO,
} from "@/modules/enrollment/application/dtos/enrollment-dto.ts";
import { EnrollmentMapper } from "@/modules/enrollment/application/mappers/enrollment-mapper.ts";
import type { IEnrollmentsRepository } from "@/modules/enrollment/domain/repositories/enrollments-repository.ts";
import { prisma } from "@/shared/database/prisma.ts";

export class PrismaEnrollmentsRepository implements IEnrollmentsRepository {
	async findById(id: string) {
		const enrollmentItem = await prisma.enrollment.findUnique({
			where: { id },
		});

		if (!enrollmentItem) return null;

		return EnrollmentMapper.toDomain(enrollmentItem);
	}

	async findEnrollments(
		query: IQueryEnrollmentDTO,
	): Promise<IQueryEnrollmentResultDTOV2[] | null> {
		const take = query.limit;
		const skip = (query.page - 1) * take;

		const enrollments = await prisma.enrollment.findMany({
			include: {
				student: true,
				class: true,
			},
			take,
			skip,
		});

		return EnrollmentMapper.toManyQueryDTOV2(enrollments);
	}
	async create(data: ICreateEnrollmentDTO) {
		const enrollmentItem = await prisma.enrollment.create({
			data: EnrollmentMapper.toPrisma(data),
		});

		return EnrollmentMapper.toDomain(enrollmentItem);
	}
	async update(id: string, data: IUpdateEnrollmentDTO) {
		const updatedEnrollment = await prisma.enrollment.update({
			where: { id },
			data: {
				...data,
			},
		});

		return EnrollmentMapper.toDomain(updatedEnrollment);
	}
	async delete(id: string) {
		await prisma.enrollment.delete({
			where: { id },
		});
	}
}
