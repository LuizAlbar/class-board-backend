export interface IDisciplineDTO {
	id: string;
	name: string;
	description: string;
}

export interface ICreateDisciplineDTO {
	name: string;
	description: string;
}

export interface IUpdateDisciplineDTO {
	name?: string;
	description?: string;
}
