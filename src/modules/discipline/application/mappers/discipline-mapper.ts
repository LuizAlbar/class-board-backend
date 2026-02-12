import type { Discipline as PrismaDiscipline } from "@prisma/client";
import { Discipline } from "../../domain/entities/discipline-entity.ts";
import type {
	ICreateDisciplineDTO,
	IDisciplineDTO,
} from "../dtos/discipline-dto.ts";

export class DisciplineMapper {
	static toDomain(raw: PrismaDiscipline): Discipline {
		return new Discipline({
			id: raw.id,
			name: raw.name,
			description: raw.description,
			organizationId: raw.organizationId,
		});
	}

	static toPrisma(data: ICreateDisciplineDTO) {
		return {
			name: data.name,
			description: data.description,
			organizationId: data.organizationId,
		};
	}

	static toDTO(discipline: Discipline): IDisciplineDTO {
		return {
			id: discipline.id,
			name: discipline.name,
			description: discipline.description,
			organizationId: discipline.organizationId,
		};
	}

	static manyToDomain(raw: PrismaDiscipline[]): Discipline[] {
		return raw.map((r) => DisciplineMapper.toDomain(r));
	}

	static manyToDTO(disciplines: Discipline[]): IDisciplineDTO[] {
		return disciplines.map((d) => DisciplineMapper.toDTO(d));
	}
}
