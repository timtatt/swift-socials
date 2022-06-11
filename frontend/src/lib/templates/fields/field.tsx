import { RefObject } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { BsGripVertical, BsPencil, BsTrash } from "react-icons/bs";

export enum FieldType {
	TEXT_FIELD = "TextField",
	DROPDOWN = "Dropdown"
}

export interface FieldOption {
	name: string;
	title: string;
}

export interface Field {
	name: string;
	label: string;
	type: FieldType;
	defaultValue: any;
	options?: FieldOption[];
	children?: Map<string, Field>;
}

export abstract class AbstractField {
	abstract type: FieldType;
	protected field: Field;

	constructor(field: Field, name?: string) {
		this.field = field;
	}

	abstract getDefaultValue(): any
	abstract renderField(onFieldUpdate: (value: any) => void): JSX.Element;
	abstract renderFieldEditor(onFieldUpdate: (field: Field) => void, defaultValueRef: RefObject<HTMLSelectElement>): JSX.Element;

	public renderFieldSummary(onStartEdit: () => void, onDelete: () => void): JSX.Element {
		return (
			<>
				<Card body>
					<Row>
						<Col className="me-auto" >
							<BsGripVertical />
							TextField: {this.field.name}, Default: {this.field.defaultValue}
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
		)
	}
}

