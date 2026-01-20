export interface IOrganizationDTO {
	id: string;
	name: string;
	slug: string;
	created_at: Date;
}

export interface ICreateOrganizationDTO {
	name: string;
	slug: string;
}
