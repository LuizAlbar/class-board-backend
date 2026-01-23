import type { AbilityBuilder } from "@casl/ability";

import type { AppAbility } from "./abilities.ts";

import type { UserContext } from "./models/user-context-model.ts";
import type { Role } from "./roles.ts";

type UserPermissions = (
	userContext: UserContext,
	buider: AbilityBuilder<AppAbility>,
) => void;

export const permissions: Record<Role, UserPermissions> = {
	COORDENADOR(member, { can, cannot }) {
		can("manage", "Membership");
	},
	PROFESSOR(member, { can, cannot }) {},
	RESPONSAVEL(member, { can, cannot }) {},
	ESTUDANTE(member, { can, cannot }) {},
	VISITANTE(member, { can, cannot }) {},
};
