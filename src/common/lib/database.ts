import { Dexie } from 'dexie';
import { Template } from '../types/template';

export class SwiftSocialsDB extends Dexie {
	templates!: Dexie.Table<Template, number>;

	constructor() {
		super('SwiftSocialsDB');
		this.version(1).stores({
			templates: '++id',
		});
	}

	async getTemplate(templateId: number): Promise<Template> {
		console.log(templateId);
		const template = await this.templates.get(templateId);

		if (!template) {
			throw new Error(`Template not found with id ${templateId}`);
		}

		return template;
	}
}

export const db = new SwiftSocialsDB();

export const saveTemplate = async (template: Template) => {
	await db.transaction('rw', db.templates, async () => {
		const res = await db.templates.put(template, template.id);
		template.id = res;
	});
}