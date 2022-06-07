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

	async getTemplate(): Promise<Template> {
		const templates: Template[] = await this.templates.toArray();
		var template = templates[0];

		console.log(template);

		if (!template) {
			template = {
				style: ".Post {\n\n}",
				layout: "<div class=\"Post\">New Post</div>",
				name: "New Template",
				form: []
			};
		}

		return template;
	}
}

export const db = new SwiftSocialsDB();