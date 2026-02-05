import type { Role } from "@/shared/auth/roles.ts";

export function createUserContext(role: Role) {
	const userContext = {
		role: role,
		userId: "123",
		organizationId: "12345",
	};

	return userContext;
}
