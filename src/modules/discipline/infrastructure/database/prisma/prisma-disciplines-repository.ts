import type {
	ICreateDisciplineDTO,
	IUpdateDisciplineDTO,
} from "@/modules/discipline/application/dtos/discipline-dto.ts";
import { DisciplineMapper } from "@/modules/discipline/application/mappers/discipline-mapper.ts";
import type { IDisciplinesRepository } from "@/modules/discipline/domain/repositories/disciplines-repository.ts";
import { prisma } from "@/shared/database/prisma.ts";

export class PrismaDisciplinesRepository implements IDisciplinesRepository {
	async findById(id: string) {
		const discipline = await prisma.discipline.findUnique({
			where: {
				id,
			},
		});

		if (!discipline) return null;

		return DisciplineMapper.toDomain(discipline);
	}
	async findByName(query: string) {
		const disciplines = await prisma.discipline.findMany({
			where: {
				name: {
					contains: query,
					mode: "insensitive",
				},
			},
		});

		if (!disciplines) return null;

		return DisciplineMapper.manyToDomain(disciplines);
	}
	async create(data: ICreateDisciplineDTO) {
		const discipline = await prisma.discipline.create({
			data: DisciplineMapper.toPrisma(data),
		});

		return DisciplineMapper.toDomain(discipline);
	}
	async update(id: string, data: IUpdateDisciplineDTO) {
		const updatedDiscipline = await prisma.discipline.update({
			where: { id },
			data: {
				...data,
			},
		});

		return DisciplineMapper.toDomain(updatedDiscipline);
	}
	async delete(id: string) {
		await prisma.discipline.delete({
			where: { id },
		});
	}
}
