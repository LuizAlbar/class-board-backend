export interface ITeacherAssignmentDTO {
	id: string;

	workload: number;

	classId: string;
	teacherId: string;
	disciplineId: string;
}

export interface ICreateTeacherAssignmentDTO {
	workload: number;

	classId: string;
	teacherId: string;
	disciplineId: string;
}

export interface IUpdateTeacherAssignmentDTO {
	id: string;

	workload?: number;

	classId?: string;
	teacherId?: string;
	disciplineId?: string;
}
