import { Field, AbstractField, FieldType } from './field';
import { TextField } from './text-field';
import { DropdownField } from './dropdown-field';

export const getField = (field: Field, fieldName?: string): AbstractField => {
	switch (field.type) {
		case FieldType.TEXT_FIELD:
			return new TextField(field, fieldName);
		case FieldType.DROPDOWN:
			return new DropdownField(field, fieldName);
	}
}