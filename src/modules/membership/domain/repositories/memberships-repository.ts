import type {
	CreateMembershipDTO,
	findUserMembershipDTO,
} from "../../application/dtos/membership-dto.ts";
import type { Membership } from "../entities/Membership.ts";

export interface MembershipsRepository {
	findById(id: string): Promise<Membership | null>;
	create(data: CreateMembershipDTO): Promise<Membership>;
	findUserInAOrganization(
		data: findUserMembershipDTO,
	): Promise<Membership | null>;
}
