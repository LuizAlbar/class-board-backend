interface RefreshTokenProps {
	readonly id: string;
	readonly token: string;
	readonly userId: string;
	readonly expiresAt: Date;
}

export class RefreshToken {
	private props: RefreshTokenProps;
	constructor(props: RefreshTokenProps) {
		this.props = props;
	}

	isExpired() {
		return this.props.expiresAt < new Date();
	}
}
