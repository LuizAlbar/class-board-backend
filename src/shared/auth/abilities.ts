import {
	AbilityBuilder,
	type CreateAbility,
	createMongoAbility,
	type MongoAbility,
} from "@casl/ability";
import z from "zod";
import type { Membership } from "./models/membership-model.ts";
import { permissions } from "./permissions.ts";
import { memberSubject } from "./subjects/membership-subject.ts";
import { organizationSubject } from "./subjects/organization-subject.ts";

const appAbilities = z.union([
	organizationSubject,
	memberSubject,
	z.tuple([z.literal("manage"), z.literal("all")]),
]);

type AppAbilities = z.infer<typeof appAbilities>;

export type AppAbility = MongoAbility<AppAbilities>;
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;

export function defineAbilityFor(member: Membership): AppAbility {
	const builder = new AbilityBuilder(createAppAbility);

	if (typeof permissions[member.role] === "function") {
		permissions[member.role](member, builder);
	} else {
		throw new Error(`Trying to use unknow role: "${member.role}"`);
	}

	const ability = builder.build({
		detectSubjectType(subject) {
			return subject.__typename;
		},
	});

	ability.can = ability.can.bind(ability);
	ability.cannot = ability.cannot.bind(ability);

	return ability;
}
