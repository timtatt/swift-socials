import { Dexie } from 'dexie';
import { Template } from './templates/template';

export class SwiftSocialsDB extends Dexie {
	templates!: Dexie.Table<Template, number>;

	constructor() {
		super('SwiftSocialsDB');
		this.version(1).stores({
			templates: '++id',
		});
		this.templates.mapToClass(Template);
	}

	async getTemplate(): Promise<Template> {
		var template = await this.templates.get(1);

		if (!template) {
			template = new Template();
		}

		return template;
	}
}

export const db = new SwiftSocialsDB();