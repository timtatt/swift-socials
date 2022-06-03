import { Field, FieldType, getField } from '../lib/templates/fields';
import { Form, Card, Button, InputGroup } from 'react-bootstrap';
import { useRef } from 'react';

interface FieldProps {
	field: Field,
	fieldName: string,
	onFieldUpdate: (field: Field) => void
	onFieldNameUpdate: (fieldName: string) => void
}

export const FieldEditor = ({field, fieldName, onFieldUpdate, onFieldNameUpdate}: FieldProps) => {
	const defaultValueRef = useRef<HTMLSelectElement>(null);

	var newFieldName = fieldName;

	return (
		<Card body>
			<Form>
				<Form.Group className="mb-3">
					<Form.Label>Field Name</Form.Label>
					<InputGroup>
						<Form.Control defaultValue={fieldName} onChange={event => newFieldName = event.target.value} />
						<Button onClick={() => onFieldNameUpdate(newFieldName)}>Update</Button>
					</InputGroup>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Field Type</Form.Label>
					<Form.Select defaultValue={field.type.valueOf()} onChange={event => {field.type = event.target.value as FieldType; onFieldUpdate(field); }}>
						{/* TODO: friendly type */}
						{Object.values(FieldType).map(type => <option value={type} key={type}>{type}</option>)}
					</Form.Select>
				</Form.Group>
				{getField(field).renderFieldEditor(() => onFieldUpdate(field), defaultValueRef)}
			</Form>
		</Card>
	);
}
