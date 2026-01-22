import z from "zod";

export enum Role {
	COORDENADOR = "COORDENADOR",
	PROFESSOR = "PROFESSOR",
	RESPONSAVEL = "RESPONSAVEL",
	ESTUDANTE = "ESTUDANTE",
	VISITANTE = "VISITANTE",
}
export const roleSchema = z.enum(Role);

export type RoleType = z.infer<typeof roleSchema>;
