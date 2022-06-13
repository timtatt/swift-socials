import { Field, FieldType } from './../fields/Field';
import { Button, Row, Col, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { faker } from '@faker-js/faker';
import Immutable from 'immutable';
import { FieldEditor } from './FieldEditor';

interface FormEditorProps {
	fields?: Field[],
	onFieldUpdate?: (fields: Immutable.List<Field>) => void
}

interface AlertState {
	message?: string,
	show: boolean
}

export default function FormEditor({fields = [], onFieldUpdate = () => {}}: FormEditorProps) {

	const [iFields, setFields] = useState(Immutable.List(fields));
	const [alert, setAlert] = useState<AlertState>({
		show: false
	});

	const addField = () => {
		var fieldName = "newField";
		const currentFieldNames: Set<string> = new Set(iFields.map(field => field.name));

		console.log(currentFieldNames);

		for (let i = 0; i < 100; i++) {
			if (!currentFieldNames.has(fieldName + i)) {
				fieldName = fieldName + i;
				break;
			}
		}

		console.log("Adding field " + fieldName);

		setFields(iFields.push({
			name: fieldName,
			label: 'New Field',
			type: FieldType.TEXT_FIELD,
			defaultValue: faker.name.findName(),
			settings: {}
		}));
	}

	const editField = (field: Field | null, index: number) => {
		var newFields;
		if (!field) {
			newFields = iFields.remove(index);
		} else {
			newFields = iFields.set(index, Object.assign({}, field));
		}
		setFields(newFields);
	}

	const verifyNames: () => boolean = () => {
		const duplicateNames: Set<string> = new Set();
		const names: Set<String> = new Set();

		for (const field of iFields) {
			if (names.has(field.name)) {
				duplicateNames.add(field.name);
			}
			names.add(field.name);
		}

		if (duplicateNames.size > 0) {
			setAlert({
				message: `Detected duplicate field names for ${Array.from(duplicateNames).join(', ')}. Please fix before saving`,
				show: true
			});
			return false;
		}

		return true;
	}

	const saveForm = () => {
		if (verifyNames()) {
			setAlert({
				show: false
			});
			onFieldUpdate(iFields);
		}
	}

	return (
		<>
			{alert.show ? <Alert variant="danger">{alert.message}</Alert> : ""}
				{iFields.map((field, index) => (
					<Row key={`${index}-${field.name}`}>
						<Col>
							<FieldEditor field={field} onFieldUpdate={updatedField => editField(updatedField, index)} />
						</Col>
				</Row>
				)).valueSeq()}
			<Button onClick={saveForm} variant="primary">Save Form</Button>
			<Button onClick={addField} variant="secondary">Add Field</Button>
		</>
	);
}