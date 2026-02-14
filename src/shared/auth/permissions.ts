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
		can("manage", "all");
		cannot("manage", "Membership", { userId: member.userId });
	},
	PROFESSOR(_member, { can, cannot }) {
		can("read", "Class");
		can("read", "Discipline");
		can("read", "TeacherAssignment");
	},
	RESPONSAVEL(_member, { can, cannot }) {
		can("read", "Class");
		can("read", "Discipline");
	},
	ESTUDANTE(_member, { can, cannot }) {
		can("read", "Class");
		can("read", "Discipline");
		can("read", "TeacherAssignment");
	},
	VISITANTE(_member, { can, cannot }) {
		cannot("manage", "all");
	},
};
