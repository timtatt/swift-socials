import { Field, FieldType } from '@/common/types/fields';
import { Button, Row, Col, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { faker } from '@faker-js/faker';
import { FieldEditor } from './FieldEditor';

interface FormEditorProps {
	fields?: Field[],
	onFieldUpdate?: (fields: Field[]) => void
}

interface AlertState {
	message?: string,
	show: boolean
}

export default function FormEditor({onFieldUpdate = () => {}, ...props}: FormEditorProps) {

	const [fields, setFields] = useState(props.fields ?? []);
	const [alert, setAlert] = useState<AlertState>({
		show: false
	});

	const addField = () => {
		var fieldName = "newField";
		const currentFieldNames: Set<string> = new Set(fields.map(field => field.name));

		console.log(currentFieldNames);

		for (let i = 0; i < 100; i++) {
			if (!currentFieldNames.has(fieldName + i)) {
				fieldName = fieldName + i;
				break;
			}
		}

		console.log("Adding field " + fieldName);

		setFields([...fields, {
			name: fieldName,
			label: 'New Field',
			type: FieldType.TEXT_FIELD,
			defaultValue: faker.name.findName(),
			settings: {}
		}]);
	}

	const editField = (field: Field | null, index: number) => {
		if (!field) {
			fields.splice(index, 1);
		} else {
			fields[0] = Object.assign({}, field);
		}
		setFields([...fields]);
	}

	const verifyNames: () => boolean = () => {
		const duplicateNames: Set<string> = new Set();
		const names: Set<String> = new Set();

		for (const field of fields) {
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
			onFieldUpdate(fields);
		}
	}

	return (
		<>
			{alert.show && <Alert variant="danger">{alert.message}</Alert>}
				{fields.map((field, index) => (
					<Row key={`${index}-${field.name}`}>
						<Col>
							<FieldEditor field={field} onFieldUpdate={updatedField => editField(updatedField, index)} />
						</Col>
				</Row>
				))}
			<Button onClick={saveForm} variant="primary">Save Form</Button>
			<Button onClick={addField} variant="secondary">Add Field</Button>
		</>
	);
}