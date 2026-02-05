import { randomUUID } from "node:crypto";
import type {
	ICreateDisciplineDTO,
	IQueryDisciplineDTO,
	IUpdateDisciplineDTO,
} from "@/modules/discipline/application/dtos/discipline-dto.ts";
import { Discipline } from "../../entities/discipline-entity.ts";
import type { IDisciplinesRepository } from "../disciplines-repository.ts";

export class InMemoryDisciplinesRepository implements IDisciplinesRepository {
	public items: Discipline[] = [];
	async findById(id: string) {
		const discipline = this.items.find((item) => item.id === id);

		if (!discipline) return null;

		return discipline;
	}
	async findDisciplines(query: IQueryDisciplineDTO) {
		const pageSize = query.limit;
		const startIndex = (query.page - 1) * pageSize;
		const endIndex = startIndex + pageSize;

		const disciplines = this.items
			.filter((item) => {
				if (query.name) {
					item.name.includes(query.name);
				}
				if (query.description) {
					item.description.includes(query.description);
				}
				return true;
			})
			.slice(startIndex, endIndex);

		if (!disciplines) return null;
		return disciplines;
	}
	async create(data: ICreateDisciplineDTO) {
		const newDiscipline = new Discipline({
			id: randomUUID(),
			name: data.name,
			description: data.description,
		});

		this.items.push(newDiscipline);
		return newDiscipline;
	}
	async update(id: string, data: IUpdateDisciplineDTO) {
		const disciplineIndex = this.items.findIndex((item) => item.id === id);
		const updatedDiscipline = new Discipline({
			...this.items[disciplineIndex].props,
			...data,
		});

		this.items[disciplineIndex] = updatedDiscipline;

		return updatedDiscipline;
	}
	async delete(id: string) {
		const disciplineIndex = this.items.findIndex((item) => item.id === id);
		this.items.splice(disciplineIndex, 1);
	}
}
