import { randomUUID } from "node:crypto";
import type {
	ICreateClassDTO,
	IUpdateClassDTO,
} from "@/modules/class/application/dtos/class-dto.ts";
import { Class } from "../../entities/class-entity.ts";
import type { IClassesRepository } from "../class-repository.ts";

export class InMemoryClassesRepository implements IClassesRepository {
	public items: Class[] = [];

	async findById(id: string) {
		const classItem = this.items.find((item) => item.id === id);

		if (!classItem) return null;

		return classItem;
	}
	async create(data: ICreateClassDTO) {
		const classItem = new Class({
			id: randomUUID(),
			name: data.name,
			period: data.period,
			year: data.year,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
		this.items.push(classItem);
		return classItem;
	}
	async update(id: string, data: IUpdateClassDTO) {
		const classItemIndex = this.items.findIndex((item) => item.id === id);
		const updatedClassItem = new Class({
			...this.items[classItemIndex].props,
			...data,
			updatedAt: new Date(),
		});

		this.items[classItemIndex] = updatedClassItem;

		return updatedClassItem;
	}
	async delete(id: string) {
		const classItemIndex = this.items.findIndex((item) => item.id === id);
		this.items.splice(classItemIndex, 1);
	}
}
