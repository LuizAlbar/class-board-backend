export interface OrganizationProps {
	id: string;
	name: string;
	slug: string;
	created_at: Date;
}

export class Organization {
	private props: OrganizationProps;

	constructor(props: OrganizationProps) {
		this.props = props;
	}

	get id() {
		return this.props.id;
	}

	get name() {
		return this.props.name;
	}

	get slug() {
		return this.props.slug;
	}

	get created_at() {
		return this.props.created_at;
	}
}
