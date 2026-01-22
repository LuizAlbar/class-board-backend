import type { AbilityBuilder } from "@casl/ability";

import type { AppAbility } from "./abilities.ts";

import type { Membership } from "./models/membership-model.ts";
import type { Role } from "./roles.ts";

type MemberPermissions = (
	member: Membership,
	buider: AbilityBuilder<AppAbility>,
) => void;

export const permissions: Record<Role, MemberPermissions> = {
	COORDENADOR(member, { can, cannot }) {
		can("manage", "Membership");
	},
	PROFESSOR(member, { can, cannot }) {},
	RESPONSAVEL(member, { can, cannot }) {},
	ESTUDANTE(member, { can, cannot }) {},
	VISITANTE(member, { can, cannot }) {},
};
