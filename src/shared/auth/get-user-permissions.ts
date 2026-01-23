import z from "zod";
import { defineAbilityFor } from "./abilities.ts";
import { Role } from "./roles.ts";

const authUserContextSchema = z.object({
	id: z.string(),
	role: z.enum(Role),
});
export const getUserPermissions = (id: string, role: Role) => {
	const authUser = authUserContextSchema.parse({ id: id, role: role });

	const ability = defineAbilityFor(authUser);

	return ability;
};
