export interface IDisciplineDTO {
	id: string;
	name: string;
	description: string;
	organizationId: string;
}

export interface ICreateDisciplineDTO {
	name: string;
	description: string;
	organizationId: string;
}

export interface IUpdateDisciplineDTO {
	id: string;
	name?: string;
	description?: string;
}

export interface IDeleteDisciplineDTO {
	id: string;
}

export interface IQueryDisciplineDTO {
	name?: string;
	description?: string;
	page: number;
	limit: number;
}
