import { getField } from '../lib/field-factory';
import { Types } from 'mongoose';
import { Field } from './fields';

export interface TemplateSize {
	name?: string,
	width: number,
	height: number
}

export type TemplateFormData = {
	[key: string]: any
}

export interface Template {
	id?: Types.ObjectId
	style: string
	layout: string,
	size?: TemplateSize
	name: string
	form: Field[]
}

type TemplateSizes = {
	[key: string]: TemplateSize
}

export const templateSizes: TemplateSizes = {
	'1200x1200': {
		name: 'Standard 1:1 (1200x1200)',
		width: 1200,
		height: 1200
	},
	'1200x628': {
		name: 'Facebook Event Cover 2:1 (1200x628)',
		width: 1200,
		height: 628
	}
};

export const getDefaultFormData = (template: Template): TemplateFormData => {
	const formData: any = {};
	for (const field of template.form) {
		formData[field.name] = getField(field).getDefaultValue();
	}
	return formData;
}
