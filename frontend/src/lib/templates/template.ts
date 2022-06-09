import { getField, Field } from "./fields";
import { db } from './../database';

export interface TemplateSize {
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
