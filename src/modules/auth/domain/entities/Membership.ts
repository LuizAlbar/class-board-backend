export enum Role {
	COORDENADOR = "COORDENADOR",
	ESTUDANTE = "ESTUDANTE",
	PROFESSOR = "PROFESSOR",
	RESPONSAVEL = "RESPONSAVEL",
}
export interface MembershipProps {
	id: string;
	role: Role;
	userId: string;
	organizationId: string;
	created_at: Date;
	updated_at: Date;
}

export class Membership {
	private props: MembershipProps;

	constructor(props: MembershipProps) {
		this.props = props;
	}

	get id() {
		return this.props.id;
	}

	get role() {
		return this.props.role;
	}

	get userId() {
		return this.props.userId;
	}

	get organizationId() {
		return this.props.organizationId;
	}

	get created_at() {
		return this.props.created_at;
	}

	get updated_at() {
		return this.props.updated_at;
	}
}
