export interface RefreshTokenProps {
	id: string;
	token: string;
	userId: string;
	expiresAt: Date;
}

export class RefreshToken {
	private props: RefreshTokenProps;
	constructor(props: RefreshTokenProps) {
		this.props = props;
	}

	isExpired() {
		return this.props.expiresAt < new Date();
	}

	get id() {
		return this.props.id;
	}

	get token() {
		return this.props.token;
	}
	get userId() {
		return this.props.userId;
	}

	get expiresAt() {
		return this.props.expiresAt;
	}
}
