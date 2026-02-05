export enum Period {
	MANHA = "MANHA",
	TARDE = "TARDE",
	NOITE = "NOITE",
}

export interface IClassProps {
	id: string;
	name: string;
	year: number;
	period: Period;
	organizationId: string;
	createdAt: Date;
	updatedAt: Date;
}

export class Class {
	public props: IClassProps;
	constructor(props: IClassProps) {
		this.props = props;
	}

	get id() {
		return this.props.id;
	}

	get name() {
		return this.props.name;
	}

	get year() {
		return this.props.year;
	}
	get period() {
		return this.props.period;
	}
	get organizationId() {
		return this.props.organizationId;
	}
	get createdAt() {
		return this.props.createdAt;
	}
	get updatedAt() {
		return this.props.updatedAt;
	}
}
