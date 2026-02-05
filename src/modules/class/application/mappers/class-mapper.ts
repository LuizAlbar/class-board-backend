import type { Class as PrismaClass } from "@prisma/client";
import { Class, type Period } from "../../domain/entities/class-entity.ts";
import type { IClassDTO, ICreateClassDTO } from "../dtos/class-dto.ts";

export class ClassMapper {
	static toDomain(raw: PrismaClass): Class {
		return new Class({
			id: raw.id,
			name: raw.name,
			year: raw.year,
			period: raw.period as Period,
			organizationId: raw.organizationId,
			createdAt: raw.createdAt,
			updatedAt: raw.updatedAt,
		});
	}

	static toPrisma(data: ICreateClassDTO) {
		return {
			name: data.name,
			year: data.year,
			period: data.period,
			organizationId: data.organizationId,
		};
	}

	static toDTO(classItem: Class): IClassDTO {
		return {
			id: classItem.props.id,
			name: classItem.props.name,
			year: classItem.props.year,
			period: classItem.props.period,
			organizationId: classItem.props.organizationId,
			createdAt: classItem.props.createdAt,
			updatedAt: classItem.props.updatedAt,
		};
	}
}
