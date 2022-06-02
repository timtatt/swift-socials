import { getField, Field } from "./fields";
import { db } from './../database';

export interface Template {
	id?: number
	style: string
	layout: string
	name: string
	form: Map<string, Field>
}

export const saveTemplate = async (template: Template) => {
		await db.transaction('rw', db.templates, async () => {
			const res = await db.templates.put(template, template.id);
			template.id = res;
		});
}

export const getDummyData = (template: Template): any => {
	const dummyData: any = {};
	for (const [fieldName, field] of template.form) {
		dummyData[fieldName] = getField(field, fieldName).getDummyData();
	}
	return dummyData;
}
