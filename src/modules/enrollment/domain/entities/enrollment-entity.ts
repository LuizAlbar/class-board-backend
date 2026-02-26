export enum Status {
	ACTIVE = "ACTIVE",
	APPROVED = "APPROVED",
	DROPPED = "DROPPED",
	PENDENT = "PENDENT",
	FAILED = "FAILED",
}

export interface IEnrollmentProps {
	id: string;
	year: number;
	status: Status;
	enrollmentDate: Date;
	studentId: string;
	classId: string;
}

export class Enrollment {
	public props: IEnrollmentProps;
	constructor(props: IEnrollmentProps) {
		this.props = props;
	}

	get id() {
		return this.props.id;
	}

	get year() {
		return this.props.year;
	}
	get enrollmentDate() {
		return this.props.enrollmentDate;
	}

	get status() {
		return this.props.status;
	}
	get studentId() {
		return this.props.studentId;
	}
	get classId() {
		return this.props.classId;
	}
}
