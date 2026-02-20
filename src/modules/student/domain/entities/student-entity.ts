export interface IStudentProps {
	id: string;
	userId: string;
	ra: string;
	dateOfBirth: Date;
	organizationId: string;
}

export class Student {
	public props: IStudentProps;

	constructor(props: IStudentProps) {
		this.props = props;
	}

	get id() {
		return this.props.id;
	}

	get userId() {
		return this.props.userId;
	}

	get ra() {
		return this.props.ra;
	}

	get dateOfBirth() {
		return this.props.dateOfBirth;
	}

	get organizationId() {
		return this.props.organizationId;
	}
}
