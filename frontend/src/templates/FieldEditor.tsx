import { Field, FieldType } from '../fields/Field';
import { getFieldComponents } from '../lib/field-factory';
import { Form, InputGroup, Button, Row, Col, Modal } from 'react-bootstrap';
import { useState } from 'react';

interface FieldProps {
	field: Field,
	onFieldUpdate: (field: Field | null) => void
}

export const FieldEditor = (props: FieldProps) => {

	const [showFieldModal, setShowFieldModal] = useState<boolean>(false);
	const [field, setField] = useState<Field>(props.field);

	const updateField = (field: Field) => {
		setField(Object.assign({}, field));
	}

	return (
		<>
			<Modal show={showFieldModal} onClose={() => setShowFieldModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Field: {field.name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Row className="g-2" xl={1}>
							<Col>
								<Form.Group className="mb-3">
									<Form.Label>Field Name</Form.Label>
									<InputGroup>
										<Form.Control defaultValue={field.name} onChange={event => { field.name = event.target.value; updateField(field) }} />
									</InputGroup>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group className="mb-3">
									<Form.Label>Field Label</Form.Label>
									<InputGroup>
										<Form.Control defaultValue={field.label} onChange={event => { field.label = event.target.value; updateField(field) }} />
									</InputGroup>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group className="mb-3">
									<Form.Label>Field Type</Form.Label>
									<Form.Select defaultValue={field.type.valueOf()} onChange={event => { field.type = event.target.value as FieldType; updateField(field) }}>
										{Object.values(FieldType).map(type => <option value={type} key={type}>{type}</option>)}
									</Form.Select>
								</Form.Group>
							</Col>
							{getFieldComponents(field).fieldEditor({
								field,
								onFieldUpdate: updatedField => updateField(updatedField)
							})}
						</Row>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowFieldModal(false)}>
						Close
					</Button>
					<Button variant="primary" onClick={() => { props.onFieldUpdate(field); setShowFieldModal(false); }}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
			{getFieldComponents(field).fieldSummary({
				field,
				onStartEdit: () => setShowFieldModal(true),
				onDelete: () => props.onFieldUpdate(null),
			})}
		</>
	);
}
