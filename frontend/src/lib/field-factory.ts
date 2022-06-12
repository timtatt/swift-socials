import { DropdownField } from '../fields/DropdownField';
import { Field, FieldType, FieldComponents, AbstractField } from '../fields/Field';
import { ImageUploadField } from '../fields/ImageUploadField';
import { TextField } from '../fields/TextField';


export const getFieldComponents = (field: Field): FieldComponents => {
	switch (field.type) {
		case FieldType.TEXT_FIELD:
		default:
			return TextField.COMPONENTS;
		case FieldType.DROPDOWN:
			return DropdownField.COMPONENTS;
		// case FieldType.IMAGE_UPLOAD:
		// 	return new ImageUploadField(field);
	}
}

export const getField = (field: Field): AbstractField => {
	switch (field.type) {
		case FieldType.TEXT_FIELD:
			return new TextField(field);
		case FieldType.DROPDOWN:
			return new DropdownField(field);
		case FieldType.IMAGE_UPLOAD:
			return new ImageUploadField(field);
	}
}