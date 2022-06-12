import { Form } from 'react-bootstrap';
import { ChangeEvent } from "react";
import { BasicFieldSummary, FieldComponents, FieldEditorProps, FieldProps, FieldSummaryProps, AbstractField, FieldType } from "./field";

const TextFieldRender = ({ field, onFieldUpdate }: FieldProps) => {
	return (
		<>
			<Form.Group>
				<Form.Label>{field.label}</Form.Label>
				<Form.Control defaultValue={field.defaultValue} onChange={event => onFieldUpdate(event.target.value)} />
			</Form.Group>
		</>
	);
}

const TextFieldEditor = ({ field, onFieldUpdate }: FieldEditorProps) => {

	const updateDefaultValue = (event: ChangeEvent<HTMLInputElement>) => {
		field.defaultValue = event.target.value;
		onFieldUpdate(field);
	};

	return (
		<>
			<Form.Group className="mb-3">
				<Form.Label>Default Value</Form.Label>
				<Form.Control defaultValue={field.defaultValue} onChange={updateDefaultValue} />
			</Form.Group>
		</>
	);
}

export class TextField extends AbstractField {
	type = FieldType.TEXT_FIELD;

	static COMPONENTS: FieldComponents = {
		fieldSummary: (props: FieldSummaryProps) => <BasicFieldSummary {...props} />,
		fieldEditor: (props: FieldEditorProps) => <TextFieldEditor {...props} />,
		field: (props: FieldProps) => <TextFieldRender {...props} />,
	}

	getDefaultValue() {
		return this.field.defaultValue;
	}
}
