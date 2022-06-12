import { AbstractField, Field, FieldType } from "./Field";
import { Form } from 'react-bootstrap';
import { ChangeEvent } from "react";

export class ImageUploadField extends AbstractField {
	type = FieldType.TEXT_FIELD

	getDefaultValue() {
		return this.field.defaultValue;
	}

	renderField(onFieldUpdate: (value: any) => void) {
		return (
			<>
				<Form.Group>
					<Form.Label>{this.field.label}</Form.Label>
					<Form.Control type="file" onChange={event => console.log(event)} />
				</Form.Group>
				{/* <Cropper
					image={yourImage}
					cropSize={{width: 1200, height: 1200}}
				/> */}
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