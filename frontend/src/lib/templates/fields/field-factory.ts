import { Field, AbstractField, FieldType } from './field';
import { TextField } from './text-field';

export const getField = (field: Field, fieldName?: string): AbstractField => {
	switch (field.type) {
		case FieldType.TEXT_FIELD:
			return new TextField(field, fieldName);
	}
}