export interface IRefreshTokenProps {
	id: string;
	token: string;
	userId: string;
	expiresAt: Date;
}

export class RefreshToken {
	private props: IRefreshTokenProps;
	constructor(props: IRefreshTokenProps) {
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
