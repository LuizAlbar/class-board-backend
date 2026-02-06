export interface ITeacherProps {
	id: string;
	userId: string;
	organizationId: string;
}

export class Teacher {
	public props: ITeacherProps;

	constructor(props: ITeacherProps) {
		this.props = props;
	}

	get id() {
		return this.props.id;
	}

	get userId() {
		return this.props.userId;
	}

	get organizationId() {
		return this.props.organizationId;
	}
}
