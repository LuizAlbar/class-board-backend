import type { IClassDTO } from "@/modules/class/application/dtos/class-dto.ts";
import type { IStudentDTO } from "@/modules/student/application/dtos/student-dto.ts";
import type { Status } from "../../domain/entities/enrollment-entity.ts";

export interface IEnrollmentDTO {
	id: string;
	year: number;
	status: Status;
	enrollmentDate: Date;
	studentId: string;
	classId: string;
}

export interface IDeleteEnrollmentDTO {
	id: string;
}

export interface ICreateEnrollmentDTO {
	year: number;
	status: Status;
	enrollmentDate: Date;
	studentId: string;
	classId: string;
}

export interface IUpdateEnrollmentDTO {
	id: string;
	year?: number;
	status?: Status;
	enrollmentDate?: Date;
	studentId?: string;
	classId?: string;
}

export interface IQueryEnrollmentDTO {
	ra?: string;
	name?: string;
	email?: string;
	year?: number;
	status?: Status;
	enrollmentDate?: Date;
	studentId?: string;
	classId?: string;
	page: number;
	limit: number;
}

export interface IQueryEnrollmentResultDTOV2 {
	id: string;
	year: number;
	status: Status;
	enrollmentDate: Date;
	student: IStudentDTO;
	class: IClassDTO;
}
