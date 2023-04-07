import { Field, FieldType } from '@/common/types/fields';
import { DropdownField } from '../../modules/fields/DropdownField';
import { FieldComponents, AbstractField } from '../../modules/fields/Field';
import { ImageUploadField } from '../../modules/fields/ImageUploadField';
import { TextField } from '../../modules/fields/TextField';


export const getFieldComponents = (field: Field): FieldComponents => {
	switch (field.type) {
		case FieldType.DROPDOWN:
			return DropdownField.COMPONENTS;
		case FieldType.IMAGE_UPLOAD:
			return ImageUploadField.COMPONENTS;
		case FieldType.TEXT_FIELD:
		default:
			return TextField.COMPONENTS;
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