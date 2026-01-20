import type {
	ICreateMembershipDTO,
	IFindUserMembershipDTO,
} from "../../application/dtos/membership-dto.ts";
import type { Membership } from "../entities/membership-entity.ts";

export interface IMembershipsRepository {
	findById(id: string): Promise<Membership | null>;
	create(data: ICreateMembershipDTO): Promise<Membership>;
	findUserAndOrganization(
		data: IFindUserMembershipDTO,
	): Promise<Membership | null>;
}
