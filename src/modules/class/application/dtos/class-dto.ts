import type { Period } from "../../domain/entities/class-entity.ts";

export interface IClassDTO {
	id: string;
	name: string;
	year: number;
	period: Period;
	organizationId: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface ICreateClassDTO {
	name: string;
	year: number;
	period: Period;
	organizationId: string;
}

export interface IUpdateClassDTO {
	id: string;
	name?: string;
	year?: number;
	period?: Period;
}
