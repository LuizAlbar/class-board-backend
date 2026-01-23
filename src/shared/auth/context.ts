import type { UserContext } from "./models/user-context-model.ts";
import type { Role } from "./roles.ts";

export interface IUserContext {
	userId: string;
	role: Role;
	orgId?: string;
}

export class UserContextMapper {
	static toModel(userContext: IUserContext): UserContext {
		return {
			__typename: "User",
			userId: userContext.userId,
			role: userContext.role as Role,
			orgId: userContext.orgId || "",
		};
	}
}
