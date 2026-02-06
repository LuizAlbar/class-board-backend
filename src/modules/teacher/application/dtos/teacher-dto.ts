export interface ITeacherDTO {
	id: string;
	userId: string;
	organizationId: string;
}

export interface ICreateTeacherDTO {
	userId: string;
	organizationId: string;
}

export interface IDeleteTeacherDTO {
	id: string;
}

export interface IQueryTeacherDTO {
	name?: string;
	email?: string;
	page: number;
	limit: number;
}

export interface IQueryTeacherResultDTO {
	id: string;
	userId: string;
	organizationId: string;
	name?: string;
	email?: string;
	page: number;
	limit: number;
}
