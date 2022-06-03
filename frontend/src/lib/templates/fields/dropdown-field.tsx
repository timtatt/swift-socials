import { AbstractField, Field, FieldType, FieldOption } from "./field";
import { Form } from 'react-bootstrap';
import { ChangeEvent, RefObject } from "react";

export class DropdownField extends AbstractField {
	type = FieldType.DROPDOWN

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

	renderFieldEditor(setField: (field: Field) => void, defaultValueRef: RefObject<HTMLSelectElement>) {
		

		const updateDefaultValue = (event: ChangeEvent<HTMLSelectElement>) => {
			this.field.defaultValue = event.target.value;
			setField(this.field);
		};

		const updateOptions = (event: ChangeEvent<HTMLTextAreaElement>) => {
			const options: FieldOption[] = event.target.value
				.split("\n")
				.map(option => {
					const optionComponents = option.split(':', 2);
					const name = optionComponents[0];
					const title = optionComponents.length > 1 ? optionComponents[1] : name;
					console.log(name);
					return {
						name: name.trim(),
						title: title.trim()
					};
				});
			
			this.field.options = options;

			if (defaultValueRef.current) {
				this.field.defaultValue = defaultValueRef.current.value;
			}

			setField(this.field);
		};

		return (
			<>
				<Form.Group className="mb-3">
					<Form.Label>Default Value</Form.Label>
					<Form.Select ref={defaultValueRef} defaultValue={this.field.defaultValue} onChange={updateDefaultValue}>
						{this.field.options?.map(option => <option key={option.name} value={option.name}>{option.title}</option>)}
					</Form.Select>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Dropdown Options</Form.Label>
					<Form.Control as="textarea" onChange={updateOptions} defaultValue={this.field.options?.map(option => `${option.name}: ${option.title}`)} placeholder="One option per line" />
				</Form.Group>
			</>
		);
	}

}