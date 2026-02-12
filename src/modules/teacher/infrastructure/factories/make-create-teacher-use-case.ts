import { CreateTeacherUseCase } from "../../application/use-cases/create-teacher-use-case.ts";
import { PrismaTeachersRepository } from "../database/prisma/prisma-teachers-repository.ts";

export function makeCreateTeacherUseCase() {
    const prismaTeacherRepository = new PrismaTeachersRepository();

    const createTeacherUseCase = new CreateTeacherUseCase(
        prismaTeacherRepository,
    );

    return createTeacherUseCase;
}
