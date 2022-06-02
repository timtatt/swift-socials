import { Field, FieldType } from './../lib/templates/fields';
import { Button } from 'react-bootstrap';

interface FormEditorProps {
	fields?: Map<string, Field>,
	onFieldUpdate?: (fields: Map<string, Field>) => void
}

export default function FormEditor({fields = new Map<string, Field>(), onFieldUpdate = () => {}}: FormEditorProps) {

	const addField = () => {
		var fieldName = "newField";
		for (let i = 0; i < 100; i++) {
			if (!fields.has(fieldName + i)) {
				fieldName = fieldName + i;
				break;
			}
		}

		fields.set(fieldName, {
			type: FieldType.TEXT_FIELD,
			defaultValue: ""
		});
		onFieldUpdate(fields);
	}

	return (
		<div>
			<Button onClick={addField}>Add Field</Button>
		</div>
	);
}