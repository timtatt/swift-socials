import { AbstractField, Field, FieldType } from "./field";
import { faker } from '@faker-js/faker';
import { Form } from 'react-bootstrap';
import { ChangeEvent } from "react";

export class TextField extends AbstractField {
	type = FieldType.TEXT_FIELD

	constructor(field: Field, name?: string) {
		super(field, name);
	}

	getDummyData() {
		return this.field.defaultValue;
	}

	renderField() {
		return (
			<div>
				<Form.Control />
			</div>
		);
	}

	renderFieldEditor(setField: (field: Field) => void) {

		const updateDefaultValue = (event: ChangeEvent<HTMLInputElement>) => {
			this.field.defaultValue = event.target.value;
			setField(this.field);
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