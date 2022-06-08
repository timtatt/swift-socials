import { Dexie } from 'dexie';
import { Template } from './templates/template';

export class SwiftSocialsDB extends Dexie {
	templates!: Dexie.Table<Template, number>;

	constructor() {
		super('SwiftSocialsDB');
		this.version(1).stores({
			templates: '++id',
		});
	}

	async getTemplate(templateId: number): Promise<Template> {
		const template = await this.templates.get(templateId);

		if (!template) {
			throw new Error(`Template not found with id ${templateId}`);
		}

		return template;
		// var template = templates[0];

		// console.log(template);

		// if (!template) {
		// 	template = {
		// 		style: ".Post {\n\n}",
		// 		layout: "<div class=\"Post\">New Post</div>",
		// 		name: "New Template",
		// 		form: []
		// 	};
		// }

		// return template;
	}
}

export const db = new SwiftSocialsDB();