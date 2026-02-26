import type {
	ICreateEnrollmentDTO,
	IQueryEnrollmentDTO,
	IQueryEnrollmentResultDTOV2,
	IUpdateEnrollmentDTO,
} from "../../application/dtos/enrollment-dto.ts";
import type { Enrollment } from "../entities/enrollment-entity.ts";

export interface IEnrollmentsRepository {
	findById(id: string): Promise<Enrollment | null>;
	findEnrollments(
		query: IQueryEnrollmentDTO,
	): Promise<IQueryEnrollmentResultDTOV2[] | null>;
	create(data: ICreateEnrollmentDTO): Promise<Enrollment>;
	update(id: string, data: IUpdateEnrollmentDTO): Promise<Enrollment>;
	delete(id: string): Promise<void>;
}
