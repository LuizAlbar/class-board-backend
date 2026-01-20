export interface IUserProps {
	id: string;
	name: string;
	email: string;
	password: string;
	created_at: Date;
	updated_at: Date;
}

export class User {
	private props: IUserProps;

	constructor(props: IUserProps) {
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
}
