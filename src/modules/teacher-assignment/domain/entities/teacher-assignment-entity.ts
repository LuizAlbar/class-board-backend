export interface ITeacherAssignmentProps {
	id: string;

	workload: number;

	classId: string;
	teacherId: string;
	disciplineId: string;
}

export class TeacherAssignment {
	public props: ITeacherAssignmentProps;
	constructor(props: ITeacherAssignmentProps) {
		this.props = props;
	}

	get id() {
		return this.props.id;
	}

	get workload() {
		return this.props.workload;
	}

	get classId() {
		return this.props.classId;
	}
	get teacherId() {
		return this.props.teacherId;
	}
	get disciplineId() {
		return this.props.disciplineId;
	}
}
