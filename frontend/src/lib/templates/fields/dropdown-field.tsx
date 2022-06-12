import { AbstractField, FieldType, FieldOption, FieldProps, FieldEditorProps, FieldSummaryProps, BasicFieldSummary, FieldComponents } from "./field";
import { Form } from 'react-bootstrap';
import { ChangeEvent, useRef } from "react";

const DropdownFieldRender = ({field, onFieldUpdate}: FieldProps) => {
	return (
		<div>
			<Form.Group>
				<Form.Label>{field.label}</Form.Label>
				<Form.Select defaultValue={field.defaultValue} onChange={event => onFieldUpdate(event.target.value)}>
					<option value="">-- Select --</option>
					{field.options?.map(fieldOption => <option key={fieldOption.name} value={fieldOption.name}>{fieldOption.title}</option>)}
				</Form.Select>
			</Form.Group>
		</div>
	);
}

const DropdownFieldEditor = ({field, onFieldUpdate}: FieldEditorProps) => {

	const defaultValueRef = useRef<HTMLSelectElement>(null);
	
	const updateDefaultValue = (event: ChangeEvent<HTMLSelectElement>) => {
		field.defaultValue = event.target.value;
		onFieldUpdate(field);
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

		field.options = options;

		if (defaultValueRef.current) {
			field.defaultValue = defaultValueRef.current.value;
		}

		onFieldUpdate(field);
	};

	return (
		<>
			<Form.Group className="mb-3">
				<Form.Label>Default Value</Form.Label>
				<Form.Select ref={defaultValueRef} defaultValue={field.defaultValue} onChange={updateDefaultValue}>
					<option value="">No Default Value</option>
					{field.options?.map(option => <option key={option.name} value={option.name}>{option.title}</option>)}
				</Form.Select>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Dropdown Options</Form.Label>
				<Form.Control as="textarea" onChange={updateOptions} defaultValue={field.options?.map(option => `${option.name}: ${option.title}`).join("\n")} placeholder="One option per line" />
			</Form.Group>
		</>
	);
}

export class DropdownField extends AbstractField {
	type = FieldType.DROPDOWN;

	static COMPONENTS: FieldComponents = {
		field: (props: FieldProps) => <DropdownFieldRender {...props} />,
		fieldEditor: (props: FieldEditorProps) => <DropdownFieldEditor {...props} />,
		fieldSummary: (props: FieldSummaryProps) => <BasicFieldSummary {...props} />
	}

	getDefaultValue() {
		return this.field.defaultValue;
	}

}