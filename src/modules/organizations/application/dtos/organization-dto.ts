export interface OrganizationDTO {
	id: string;
	name: string;
	slug: string;
	created_at: Date;
}

export interface CreateOrganizationDTO {
	name: string;
	slug: string;
}
