export enum UserRole {
	COORDENADOR = "COORDENADOR",
	ESTUDANTE = "ESTUDANTE",
	PROFESSOR = "PROFESSOR",
	RESPONSAVEL = "RESPONSAVEL",
}
export interface UserProps {
	id: string;
	name: string;
	email: string;
	password: string;
	created_at: Date;
	updated_at: Date;
	role: UserRole;
}

export class User {
	private props: UserProps;

	constructor(props: UserProps) {
		if (!props.password || props.password.length < 8) {
			throw new Error();
		}
		this.props = props;
	}

	get id() {
		return this.props.id;
	}

	get name() {
		return this.props.name;
	}

	get email() {
		return this.props.email;
	}

	get password() {
		return this.props.password;
	}

	get created_at() {
		return this.props.created_at;
	}

	get updated_at() {
		return this.props.updated_at;
	}

	get role() {
		return this.props.role;
	}
}
