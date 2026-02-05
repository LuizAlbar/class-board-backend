export interface IDisciplineProps {
	id: string;
	name: string;
	description: string;
}

export class Discipline {
	public props: IDisciplineProps;

	constructor(props: IDisciplineProps) {
		this.props = props;
	}

	get id() {
		return this.props.id;
	}

	get name() {
		return this.props.name;
	}

	get description() {
		return this.props.description;
	}
}
