import { getField, Field } from "./fields";
import { db } from './../database';

export interface TemplateSize {
	name?: string,
	width: number,
	height: number
}

export interface Template {
	id?: number
	style: string
	layout: string,
	size: TemplateSize
	name: string
	form: Field[]
}

export const templateSizes: Map<string, TemplateSize> = new Map([
	['1200x1200', {
		name: 'Standard 1:1 (1200x1200)',
		width: 1200,
		height: 1200
	}],
	['1200x628', {
		name: 'Facebook Event Cover 2:1 (1200x628)',
		width: 1200,
		height: 628
	}]
]);

export const saveTemplate = async (template: Template) => {
	await db.transaction('rw', db.templates, async () => {
		const res = await db.templates.put(template, template.id);
		template.id = res;
	});
}

export const getDefaultFormData = (template: Template): any => {
	const formData: any = {};
	for (const field of template.form) {
		formData[field.name] = getField(field).getDefaultValue();
	}
	return formData;
}
