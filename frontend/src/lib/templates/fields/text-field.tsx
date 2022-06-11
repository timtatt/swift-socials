import { AbstractField, Field, FieldType } from "./field";
import { Card, Form, Col, Row, Button } from 'react-bootstrap';
import { ChangeEvent } from "react";
import { BsGripVertical, BsPencil } from 'react-icons/bs';

export class TextField extends AbstractField {
	type = FieldType.TEXT_FIELD

	getDefaultValue() {
		return this.field.defaultValue;
	}

	renderField(onFieldUpdate: (value: any) => void) {
		return (
			<>
				<Form.Group>
					<Form.Label>{this.field.label}</Form.Label>
					<Form.Control defaultValue={this.field.defaultValue} onChange={event => onFieldUpdate(event.target.value)} />
				</Form.Group>
			</>
		);
	}

	renderFieldEditor(onFieldUpdate: (field: Field) => void) {

		const updateDefaultValue = (event: ChangeEvent<HTMLInputElement>) => {
			this.field.defaultValue = event.target.value;
			onFieldUpdate(this.field);
		};

		return (
			<>
				<Form.Group className="mb-3">
					<Form.Label>Default Value</Form.Label>
					<Form.Control defaultValue={this.field.defaultValue} onChange={updateDefaultValue} />
				</Form.Group>
			</>
		);
	}



}