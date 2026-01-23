import {
	AbilityBuilder,
	type CreateAbility,
	createMongoAbility,
	type MongoAbility,
} from "@casl/ability";
import z from "zod";
import type { UserContext } from "./models/user-context-model.ts";
import { permissions } from "./permissions.ts";
import { membershipSubject } from "./subjects/membership-subject.ts";
import { organizationSubject } from "./subjects/organization-subject.ts";
import { userContextSubject } from "./subjects/user-context-subject.ts";

const appAbilities = z.union([
	organizationSubject,
	membershipSubject,
	userContextSubject,
	z.tuple([z.literal("manage"), z.literal("all")]),
]);

type AppAbilities = z.infer<typeof appAbilities>;

export type AppAbility = MongoAbility<AppAbilities>;
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;

export function defineAbilityFor(user: UserContext): AppAbility {
	const builder = new AbilityBuilder(createAppAbility);

	if (typeof permissions[user.role] === "function") {
		permissions[user.role](user, builder);
	} else {
		throw new Error(`Trying to use unknow role: "${user.role}"`);
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
