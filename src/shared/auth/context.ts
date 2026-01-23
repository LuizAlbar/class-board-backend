import type { UserContext } from "./models/user-context-model.ts";
import type { Role } from "./roles.ts";

interface IUserContext {
	userId: string;
	orgId?: string;
	role?: Role;
}

export class UserContextMapper {
	static toModel(userContext: IUserContext): UserContext {
		return {
			__typename: "User",
			userId: userContext.userId,
			orgId: userContext.orgId,
			role: userContext.role as Role,
		};
	}
}
