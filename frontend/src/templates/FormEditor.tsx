import { Field, FieldType } from './../lib/templates/fields';
import { Button, Row, Col } from 'react-bootstrap';
import { getField } from './../lib/templates/fields';
import { useState } from 'react';
import { faker } from '@faker-js/faker';
import Immutable from 'immutable';
import { FieldEditor } from './FieldEditor';

interface FormEditorProps {
	fields?: Map<string, Field>,
	onFieldUpdate?: (fields: Immutable.Map<string, Field>) => void
}

export default function FormEditor({fields = new Map<string, Field>(), onFieldUpdate = () => {}}: FormEditorProps) {

	const [iFields, setFields] = useState(Immutable.Map(fields.entries()));

	const addField = () => {
		var fieldName = "newField";
		for (let i = 0; i < 100; i++) {
			if (!fields.has(fieldName + i)) {
				fieldName = fieldName + i;
				break;
			}
		}

		console.log("Adding field " + fieldName);

		editField(fieldName, {
			type: FieldType.TEXT_FIELD,
			defaultValue: faker.name.findName()
		});
	}

	const editField = (fieldName: string, field: Field) => {
		updateFields(iFields.set(fieldName, field));
	}

	const editFieldName = (prevFieldName: string, fieldName: string, field: Field) => {
		updateFields(iFields.remove(prevFieldName).set(fieldName, field));
	}
	
	const clearFields = () => {
		updateFields(iFields.clear());
	}

	const updateFields = (fields: Immutable.Map<string, Field>) => {
		setFields(fields);
		onFieldUpdate(fields);
	}

	return (
		<div>
			<Row md={5} className="g-4">
				{iFields.map((field, fieldName) => (
					<Col>
						<FieldEditor key={fieldName} fieldName={fieldName} field={field} onFieldUpdate={() => editField(fieldName, field)} onFieldNameUpdate={newFieldName => editFieldName(fieldName, newFieldName, field)} />
					</Col>
				)).valueSeq()}
			</Row>
			<Button onClick={addField}>Add Field</Button>
			<Button onClick={clearFields}>Clear Fields</Button>
		</div>
	);
}