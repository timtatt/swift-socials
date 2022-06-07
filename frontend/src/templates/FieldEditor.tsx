import { Field, FieldType, getField } from '../lib/templates/fields';
import { Form, Card, Button, InputGroup } from 'react-bootstrap';
import { useRef } from 'react';

interface FieldProps {
	field: Field,
	onFieldUpdate: (field: Field) => void
}

export const FieldEditor = ({field, onFieldUpdate}: FieldProps) => {
	const defaultValueRef = useRef<HTMLSelectElement>(null);

	return (
		<Card body>
			<Form>
				<Form.Group className="mb-3">
					<Form.Label>Field Name</Form.Label>
					<InputGroup>
						<Form.Control defaultValue={field.name} onChange={event => {field.name = event.target.value; onFieldUpdate(field); }} />
						{/* TODO: add alert when setting field name to existing field name */}
					</InputGroup>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Field Type</Form.Label>
					<Form.Select defaultValue={field.type.valueOf()} onChange={event => {field.type = event.target.value as FieldType; onFieldUpdate(field); }}>
						{Object.values(FieldType).map(type => <option value={type} key={type}>{type}</option>)}
					</Form.Select>
				</Form.Group>
				{getField(field).renderFieldEditor(() => onFieldUpdate(field), defaultValueRef)}
			</Form>
		</Card>
	);
}
