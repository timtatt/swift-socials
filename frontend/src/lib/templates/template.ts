import { Field } from "./fields/field";
import { db } from './../database';

export class Template {
	id!: number;
	form: Field[] = [];
	style: string = '';
	layout: string = '';
	name: string = '';

	async save() {
		await db.transaction('rw', db.templates, async () => {
			const res = await db.templates.put(this, this.id);
			this.id = res;
		});
	}

}