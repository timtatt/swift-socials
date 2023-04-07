import { Field, FieldType } from "@/common/types/fields";
import { Button, Card, Col, Row } from "react-bootstrap";
import { BsGripVertical, BsPencil, BsTrash } from "react-icons/bs";

export interface FieldComponents {
	fieldSummary: (props: FieldSummaryProps) => JSX.Element,
	fieldEditor: (props: FieldEditorProps) => JSX.Element,
	field: (props: FieldProps) => JSX.Element
}

export interface FieldSummaryProps {
	field: Field,
	onStartEdit: () => void,
	onDelete: () => void
}

export interface FieldEditorProps {
	field: Field,
	onFieldUpdate: (field: Field) => void
}

export interface FieldProps {
	field: Field,
	onFieldUpdate: (value: any) => void
}

export const BasicFieldSummary = ({ onDelete, onStartEdit, field }: FieldSummaryProps) => {
	return (
		<>
			<Card body>
				<Row>
					<Col className="me-auto" >
						<BsGripVertical />
						{field.type}: {field.name}, Default: {field.defaultValue}
					</Col>
					< Col className="text-end" title="Edit Field" >
						<Button className="mx-2" size="sm" variant="secondary" onClick={() => onStartEdit()}>
							<BsPencil />
						</Button>
						<Button variant="outline-danger" size="sm" onClick={() => onDelete()}>
							<BsTrash />
						</Button>
					</Col>
				</Row>
			</Card>
		</>
	);
}

export abstract class AbstractField {
	abstract type: FieldType;
	protected field: Field;

	constructor(field: Field) {
		this.field = field;
	}

	abstract getDefaultValue(): any
}

