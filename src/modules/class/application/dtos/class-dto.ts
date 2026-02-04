import type { Period } from "../../domain/entities/class-entity.ts";

export interface IClassDTO {
	name: string;
	year: number;
	period: Period;
	createdAt: Date;
	updatedAt: Date;
}

export interface ICreateClassDTO {
	name: string;
	year: number;
	period: Period;
}

export interface IUpdateClassDTO {
	name?: string;
	year?: number;
	period?: Period;
}
