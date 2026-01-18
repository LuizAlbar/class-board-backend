import type { UserRole } from "./User.ts";

export interface RefreshTokenProps {
	id: string;
	token: string;
	userId: string;
	userRole: UserRole;
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

	get userRole() {
		return this.props.userRole;
	}
	get expiresAt() {
		return this.props.expiresAt;
	}
}
