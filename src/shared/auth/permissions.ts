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
		can("read", "Student");
		can("read", "Enrollment");
	},
	RESPONSAVEL(_member, { can, cannot }) {
		can("read", "Class");
		can("read", "Discipline");
		can("read", "Student");
		can("read", "Enrollment");
	},
	ESTUDANTE(_member, { can, cannot }) {
		can("read", "Class");
		can("read", "Discipline");
		can("read", "TeacherAssignment");
		can("read", "Student");
		can("read", "Enrollment");
	},
	VISITANTE(_member, { can, cannot }) {
		cannot("manage", "all");
	},
};
